import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faEye, faEyeSlash, faTwitter)
function Register() {

    const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const [Data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    })

    const [errors, setErrors] = useState({
        FirstNameError: null,
        LastNameError: null,
        EmailError: null,
        UsernameError: null,
        PasswordError: null,
        ConfirmPasswordError: null

    })


    //state declaration
    const [userReg, setuserReg] = useState({
        "username": "",
        "password": "",
        "password1": "",
        "email": "",
        "first_name": "",
        "last_name": "",
    })

    //state handler
    const userHandle = (e) => {
        if (e.target.name === 'username') {
            setData({
                ...Data,
                username: e.target.value
            })

            setErrors({
                ...errors,
                UsernameError:
                    e.target.value.length === 0 ?
                        "This Field is Required" :
                        e.target.value.length < 3 ?
                            "Minimum Length is 3 charachters" :
                            e.target.value.indexOf(' ') >= 0 ?
                                "Username Cant Have Spaces" :
                                null

            })
            setuserReg({ ...userReg, "username": e.target.value })
        }

        else if (e.target.name === 'password') {
            setData({
                ...Data,
                password: e.target.value
            })

            setErrors({
                ...errors,
                PasswordError:
                    e.target.value.length === 0 ?
                        "This Field is Required" :
                        e.target.value.length < 8 ?
                            "Minimum Length is 8 charachters" :
                            (!validPassword.test(e.target.value)) ?
                                "Password must contain at least  one lowercase , one uppercase ,  at least one digit and special character" :
                                null
            })
            setuserReg({ ...userReg, "password": e.target.value })
        }

        else if (e.target.name === 'password1') {
            setData({
                ...Data,
                confirmpassword: e.target.value
            })

            setErrors({
                ...errors,
                ConfirmPasswordError:
                    e.target.value.length === 0 ?
                        "This Field is Required" :
                        e.target.value.length < 8 ?
                            "Minimum Length is 8 charachters" :
                            (!validPassword.test(e.target.value)) ?
                                "Password must contain at least  one lowercase , one uppercase ,  at least one digit and special character" :
                                Data.password !== e.target.value ?
                                    "Password Does not match" :
                                    null
            })
            setuserReg({ ...userReg, "password1": e.target.value })
        }
        else if (e.target.name === 'first_name') {
            setData({
                ...Data,
                firstname: e.target.value
            })

            setErrors({
                ...errors,
                FirstNameError:
                    e.target.value.length === 0 ?
                        "This Field is Required" : null
            })
            setuserReg({ ...userReg, "first_name": e.target.value })

        }
        else if (e.target.name === 'last_name') {
            setData({
                ...Data,
                lastname: e.target.value
            })

            setErrors({
                ...errors,
                LastNameError:
                    e.target.value.length === 0 ?
                        "This Field is Required" : null
            })
            setuserReg({ ...userReg, "last_name": e.target.value })

        }
        else if (e.target.name === 'email') {
            setData({
                ...Data,
                email: e.target.value
            })

            setErrors({
                ...errors,
                EmailError:
                    e.target.value.length === 0 ?
                        "This Field is Required" : null
            })
            setuserReg({ ...userReg, "email": e.target.value })
        }

    }

    //form handler
    const formHandle = (e) => {
        e.preventDefault();
        //checking state
        axios.post('https://mini-twitter-app-deploy.herokuapp.com/createuser/', userReg, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => { console.log(res.data, res.status); if (res.status === 201) { window.location.href = "/" } })
            .catch((err) => {
                console.log(err); if (err.response.status === 400) {
                    if (err.response.data.username)
                        setErrors({
                            ...errors,
                            UsernameError: "Already Existed"
                        })

                    if (err.response.data.email)
                        setErrors({
                            ...errors,
                            EmailError: "Already Existed"
                        })
                }
            })
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon="fa-brands fa-twitter" className="text-info" style={{ fontSize: "55px", margin: "15px", marginBottom: "0" }} />
                <span className="h1 mt-3 text-info">Welcome To MiniTwitter</span>
            </div>
            {localStorage.getItem("auth") ? <Redirect to='/home' /> : (
                <div className="w-50 mx-auto mt-5 mb-5">
                    <h2> Join Us </h2>
                    <form onSubmit={e => formHandle(e)} className="row g-3">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>First Name</label>
                            <input
                                type="text"
                                className=
                                {`form-control ${errors.FirstNameError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Name"
                                // value={Data.name}
                                name='first_name' value={userReg.first_name} onChange={e => userHandle(e)}
                            />

                            <p className="text-danger"> {errors.FirstNameError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Last Name</label>
                            <input
                                type="text"
                                className=
                                {`form-control ${errors.LastNameError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Name"
                                // value={Data.name}
                                name='last_name' value={userReg.last_name} onChange={e => userHandle(e)}
                            />

                            <p className="text-danger"> {errors.LastNameError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Email</label>
                            <input
                                required
                                type="email"
                                className=
                                {`form-control ${errors.EmailError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Email"
                                // value={Data.email}
                                name="email" value={userReg.email} onChange={e => userHandle(e)}

                            />

                            <p className="text-danger"> {errors.EmailError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Username</label>
                            <input
                                required
                                type="text"
                                className=
                                {`form-control ${errors.UsernameError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Username"
                                name='username' value={userReg.username} onChange={e => userHandle(e)}
                            // value={Data.username}
                            />

                            <p className="text-danger"> {errors.UsernameError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label" style={{ float: "left" }}>Password</label>
                            <input
                                type={passwordType}
                                className={`form-control  
                            ${errors.PasswordError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Password"
                                name='password' value={userReg.password} onChange={e => userHandle(e)}
                            // value={Data.password}

                            />
                            <button style={{ float: "right", transform: "translateY(-38px)" }} className="btn btn-outline-primary" onClick={togglePassword}>
                                {passwordType === "password" ? <FontAwesomeIcon icon="fas fa-eye-slash" /> : <FontAwesomeIcon icon="fa-solid fa-eye" />}
                            </button>
                            <p className="text-danger"> {errors.PasswordError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Confirm Password</label>
                            <input
                                type={passwordType}
                                className=
                                {`form-control ${errors.ConfirmPasswordError ? "border-danger" : "border-success"}`}
                                placeholder="Please Retype Your Password"
                                // value={Data.confirmpassword}
                                name='password1' value={userReg.password1} onChange={e => userHandle(e)}
                            />
                            <button style={{ float: "right", transform: "translateY(-38px)" }} className="btn btn-outline-primary" onClick={togglePassword}>
                                {passwordType === "password" ? <FontAwesomeIcon icon="fas fa-eye-slash" /> : <FontAwesomeIcon icon="fa-solid fa-eye" />}
                            </button>

                            <p className="text-danger"> {errors.ConfirmPasswordError} </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-info text-light"
                            disabled={errors.EmailError || errors.PasswordError || errors.NameError || errors.UsernameError || errors.ConfirmPasswordError}>
                            Register
                        </button>
                    </form>

                </div>
                // <form onSubmit={e => formHandle(e)}>
                //     <input type='text' name='first_name' value={userReg.first_name} onChange={e => userHandle(e)} />
                //     <input type='text' name='last_name' value={userReg.last_name} onChange={e => userHandle(e)} />
                //     <input type='email' name='email' value={userReg.email} onChange={e => userHandle(e)} />
                //     <input type='text' name='username' value={userReg.username} onChange={e => userHandle(e)} />
                //     <input type='password' name='password' value={userReg.password} onChange={e => userHandle(e)} />
                //     <input type='password' name='password1' value={userReg.password1} onChange={e => userHandle(e)} />
                //     <input type="submit" value='resgister' />
                // </form>
            )}
        </>
    )
}

export default Register