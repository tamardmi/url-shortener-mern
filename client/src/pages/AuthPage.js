import React, {useState}  from 'react'

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }



    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>URL shortener</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        {/*Move styles to the CSS file*/}
                        <button className="btn yellow darken-4" style={{marginRight: 10}}>Log In</button>
                        <button className="btn grey lighten-1">Sing Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}