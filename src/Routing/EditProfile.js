import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Components/NavBar";

function EditProfile() {

    //state declaration
    const [Data, setData] = useState({
        firstname: "",
        lastname: "",
        bio: "",
        location: "",
    })

    const [errors, setErrors] = useState({
        FirstNameError: null,
        LastNameError: null,

    })

    //state handler
    const userHandle = (e) => {
        if (e.target.name === 'first_name') {
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





        } else if (e.target.name === 'location') {
            setData({
                ...Data,
                location: e.target.value
            })
        } else if (e.target.name === 'bio') {
            setData({
                ...Data,
                bio: e.target.value
            })
        }

    }
    //handlers
    const inputFile = useRef(null)

    const [image, setimage] = useState(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const getpic = (e) => {
        // console.log(e.target.files[0])
        setimage(e.target.files[0])

    }

    const formHandle = (e) => {
        e.preventDefault();
    }

    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    useEffect(() => {
        axios.get(`https://mini-twitter-app-deploy.herokuapp.com/editprofileinfo/${JSON.parse(localStorage.getItem("userinfo")).username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { setData(res.data.userinfo) })
            .catch((err) => console.log(err))
    }, [])

    //edit profile
    const chageprofile = (e) => {
        e.preventDefault();

        if (image) {
            console.log("chageimage")
            let form = new FormData(e.target)
            axios.post('https://mini-twitter-app-deploy.herokuapp.com/editprofile/', form, {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { console.log(res.data, res.status); if (res.status === 200) { let newinfo = JSON.parse(localStorage.getItem("userinfo")); newinfo.propic = res.data.propic; localStorage.setItem("userinfo", JSON.stringify(newinfo)); window.location.href = `/${newinfo.username}` } })
                .catch((err) => console.log(err))
        }
        else {
            axios.post('https://mini-twitter-app-deploy.herokuapp.com/withoutimage/', Data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { if (res.status === 200) { window.location.href = `/${JSON.parse(localStorage.getItem("userinfo")).username}` } })
                .catch((err) => { })


        }
    }

    return (
        <>
            {!localStorage.getItem("auth") ? <Redirect to='/' /> : (
                <>
                    <NavBar />
                    <div className="w-50 mx-auto mt-5 mb-5">
                        <form onSubmit={e => chageprofile(e)} className="row g-3">
                            <div className="d-flex align-items-center" style={{ margin: "70px", position: 'relative' }}>
                                {JSON.parse(localStorage.getItem("userinfo")).propic ? (
                                    <img src={`https://mini-twitter-app-deploy.herokuapp.com${JSON.parse(localStorage.getItem("userinfo")).propic}`} alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                                ) : (
                                    <img src="https://via.placeholder.com/350x150" alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                                )}

                                <div style={{ marginLeft: "25px" }}>
                                    <h1 >{JSON.parse(localStorage.getItem("userinfo")).username}</h1>
                                    <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "70%", left: "25%", width: "25%", backgroundColor: "#00acee", borderRadius: "20px" }} onClick={(e) => { e.preventDefault(); onButtonClick(); }}>Change Pic</button>
                                </div>
                                <input type="file" ref={inputFile} name='propic' style={{ display: "none" }} onChange={e => getpic(e)} />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>First Name</label>
                                <input
                                    type="text"
                                    className=
                                    {`form-control ${errors.FirstNameError ? "border-danger" : "border-success"}`}
                                    placeholder="Please Enter Your Name"
                                    // value={Data.name}
                                    name='first_name' value={Data.firstname} onChange={e => userHandle(e)}
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
                                    name='last_name' value={Data.lastname} onChange={e => userHandle(e)}
                                />

                                <p className="text-danger"> {errors.LastNameError} </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Location</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="location"
                                    // value={Data.name}
                                    name='location' value={Data.location} onChange={e => userHandle(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label" style={{ float: "left" }}>Bio</label>
                                <textarea className="form-control" placeholder='Let Others Know About You' style={{ width: "100%", height: "200px", resize: "none", borderRadius: "25px", textAlign: "center", fontSize: "25px" }} name='bio' value={Data.bio} onChange={e => userHandle(e)} />
                            </div>
                            <div>

                                <input style={{ width: "45%", marginRight: "5%", backgroundColor: "#00acee", borderRadius: "20px" }} className="btn text-light" type="submit" value='Close' onClick={(e) => { e.preventDefault(); window.location.href = "/home" }} />

                                <input style={{ width: "45%", marginLeft: "5%", backgroundColor: "#00acee", borderRadius: "20px" }} className="btn text-light" type="submit" disabled={errors.FirstNameError || errors.LastNameError} value='Save' />
                            </div>


                        </form>
                    </div>

                </>)
            }
        </>
    )
}

export default EditProfile;