const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid email format').isEmail(),
        check('password', 'Password is too short. Minimal length is 6').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration parameters'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email: email})

        // Check if user with provided email already exists
        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exists`})
        }

        const hashedPassword = await bcrypt.hash(password, Date.now() - 1996)
        const user = new User({email, password: hashedPassword})

        await  user.save()

        res.status(201).json({message: 'User has been successfully created'})


    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Invalid email format').normalizeEmail().isEmail(),
        check('password', 'Password is too short. Minimal length is 6').isLength({min: 6}),
        check('password', 'Please enter your password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect credentials'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email: email})

        // Check if user with provided email already exists
        if (!user) {
            return res.status(400).json({message: `User with email ${email} does not exist`})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: `Please provide correct password`})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtKey'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.Id})


    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

module.exports = router