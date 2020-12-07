const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 8080 // assigns 8080 if not exist

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(8080, () => console.log(`Server is up and running on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

