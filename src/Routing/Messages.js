import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import MessageExplore from "../Components/MessageExplore";
import NavBar from "../Components/NavBar"

function Messages() {

    const params = useParams();
    //fetch all users

    //statemessage
    const [userimage, setuserimage] = useState("")
    const [mess, setMess] = useState("");
    const [divmess, setDivmess] = useState([]);
    //fetch message
    useEffect(() => {
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        if (params.username) {

            const interval = setInterval(() => {
                axios.get(`https://mini-twitter-app-deploy.herokuapp.com/divmessages/${params.username}`, {
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "multipart/form-data",
                        'Authorization': 'Bearer ' + String(tokenaccess)
                    }
                })
                    .then((res) => { setDivmess(res.data.message.reverse()); setuserimage(res.data.propic); })
                    .catch((err) => console.log(err))


            }, 1000)

            return () => clearInterval(interval);
        }
    }, [params.username])

    //declare user


    //send message handler
    const formhandler = (e) => {
        e.preventDefault();
        //checking state
        let from1 = new FormData(e.target)
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        axios.post(`https://mini-twitter-app-deploy.herokuapp.com/sendmessageto/${params.username}`, from1, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { console.log(res.data, res.status); setMess(""); })
            .catch((err) => console.log(err))


    }


    return (
        <>
            {!localStorage.getItem("auth") ? <Redirect to="/" /> : (
                <>
                    <NavBar />
                    {params.username && (
                        <>
                            <div>
                                <div className="message d-flex align-items-center" style={{ width: "50%", margin: "auto", marginTop: "10px", marginBottom: "10px" }} onClick={() => { window.location.href = `/${params.username}` }}>
                                    {userimage ? (
                                        <img src={`https://mini-twitter-app-deploy.herokuapp.com${userimage}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                    ) : (
                                        <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                    )}
                                    <div>
                                        <h2>{params.username}</h2>
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: "ghostwhite", width: "50%", minHeight: "660px",
                                    marginTop: "15px",
                                    margin: "auto", padding: '20px', display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "15px"
                                }}>


                                    <div className="showmessage" style={{ fontSize: "25px", display: "flex", flexDirection: "column" }}>
                                        {divmess.map((e) => {
                                            return (
                                                <>
                                                    <p style={{
                                                        maxWidth: "100%", minWidth: "100px", textAlign: "center", wordWrap: "break-word", backgroundColor: e.from === JSON.parse(localStorage.getItem("userinfo")).username ? "#41464b" : "#00acee",
                                                        borderRadius: "25px", width: "fit-content", color: e.from === JSON.parse(localStorage.getItem("userinfo")).username ? "#f8f9fa" : "white", textAlign: "left", padding: "15px",
                                                        alignSelf: e.from === JSON.parse(localStorage.getItem("userinfo")).username ? "flex-end" : "flex-start", textAlign: "center"
                                                    }}>
                                                        {e.message}
                                                    </p>
                                                </>

                                            )

                                        })}
                                    </div>
                                    <form style={{ backgroundColor: "#00acee", textAlign: "center", padding: "20px", borderRadius: "25px", display: "flex", alignItems: "center" }} onSubmit={e => { formhandler(e) }}>
                                        <textarea style={{ width: "100%", minHeight: "50%", resize: "none", borderRadius: "25px", textAlign: "center", fontSize: "25px" }} name='content' value={mess} onChange={(e) => setMess(e.target.value)} />
                                        <input className="btn btn-light" style={{ color: '#00acee', marginLeft: "15px", width: "100px", height: "50px", borderRadius: "50px" }} type={'submit'} value="Send" />
                                    </form>
                                </div>

                            </div>

                        </>
                    )}

                </>
            )}

        </>


    )
}

export default Messages;