import axios from 'axios'
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link, useParams } from "react-router-dom"
library.add(faEye, faEyeSlash, faTwitter)

function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const [Data, setData] = useState({
        email: "",
        password: ""
    })


    const [errors, setErrors] = useState({
        EmailError: null,
        PasswordError: null,

    })

    //state
    const [userLog, setuserLog] = useState({
        "username": '',
        "password": ''
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
            setuserLog({ ...userLog, "username": e.target.value })
        }
        else if (e.target.name === "password") {
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
                            null
            })
            setuserLog({ ...userLog, "password": e.target.value })
        }
    }

    //form handler
    const formHandle = (e) => {
        e.preventDefault();
        //checking state
        axios.post('https://mini-twitter-app-deploy.herokuapp.com/api/token/', userLog, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data); if (res.status === 200) {
                    localStorage.setItem("auth", JSON.stringify(res.data));
                    axios.get('https://mini-twitter-app-deploy.herokuapp.com/userinfo/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + String(res.data.access)
                        }
                    }).then((repo) => { if (repo.status === 200) localStorage.setItem("userinfo", JSON.stringify(repo.data)); window.location.href = "/home"; })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setErrors({
                        ...errors,
                        PasswordError: "Wrong UserName or Password"
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
            {localStorage.getItem("auth") ? <Redirect to="/home" /> : (
                <div className="w-50 mx-auto mt-5">
                    <h1> Login </h1>
                    <form onSubmit={e => formHandle(e)} className="row g-3">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>UserName</label>
                            <input
                                type='text' name='username' value={userLog.username} onChange={e => userHandle(e)}
                                className=
                                {`form-control ${errors.EmailError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your UserName"
                            // value={Data.email}
                            />
                            <p className="text-danger"> {errors.EmailError} </p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label" style={{ float: "left" }}>Password</label>
                            <input
                                type={passwordType}
                                className={`form-control  
                            ${errors.PasswordError ? "border-danger" : "border-success"}`}
                                placeholder="Please Enter Your Password"
                                // value={Data.password}
                                value={userLog.password} onChange={e => userHandle(e)}
                                name="password"
                            />
                            <button style={{ float: "right", transform: "translateY(-38px)" }} className="btn btn-outline-primary" onClick={togglePassword}>
                                {passwordType === "password" ? <FontAwesomeIcon icon="fas fa-eye-slash" /> : <FontAwesomeIcon icon="fa-solid fa-eye" />}
                            </button>
                            <p className="text-danger"> {errors.PasswordError} </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-info text-light"
                            disabled={errors.EmailError || errors.PasswordError}>
                            Login
                        </button>
                        <Link style={{ textAlign: "right", textDecoration: "none" }} to={"/register"}>New Here ? Sign up</Link>
                    </form>

                </div>
                // <form onSubmit={e => formHandle(e)}>
                //     <input type='text' name='username' value={userLog.username} onChange={e => userHandle(e)} />
                //     <input type='password' name='password' value={userLog.password} onChange={e => userHandle(e)} />
                //     <input type="submit" value='login' />
                // </form>
            )}
        </>
    )
}

export default Login