import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CreateTweet from "./CreateTweet";
import { CreateTweetContext } from "./CreateTweetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBell, faPen } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

library.add(faTwitter)
function NavBar() {

    //show message state
    const [ShowMessage, setShowMessage] = useState(false)
    const [makediffmes, setmakediffmes] = useState(false)
    const [ShowNot, setShowNot] = useState(false)
    const [makediffnot, setmakediffnot] = useState(false)
    const [seenmsg, setSeenMsg] = useState(false)
    const [seennot, setSeenNot] = useState(false)

    //messagestate
    const [mes, setmes] = useState([]);
    const [not, setnot] = useState([]);

    const [showCreate, setshowCreate] = useState(false)

    const [userPropic, setPropic] = useState("")

    //get all message
    useEffect(() => {
        if (!localStorage.getItem("meslength"))
            localStorage.setItem("meslength", "0")

        if (!localStorage.getItem("notlength"))
            localStorage.setItem("notlength", "0")

        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access


        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app-deploy.herokuapp.com/getallmessages/`, {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { setmes(res.data.message); setnot(res.data.notlist) })
                .catch((err) => console.log(err))

        }, 1000)

        return () => clearInterval(interval);

    }, [])

    //on fetch message
    useEffect(() => {
        if (mes.length > parseInt(localStorage.getItem("meslength"))) {
            setmakediffmes(true)

        }

    }, [mes])

    useEffect(() => {
        if (not.length > parseInt(localStorage.getItem("notlength"))) {
            setmakediffnot(true)

        }

    }, [not])

    useEffect(() => {
        setPropic(JSON.parse(localStorage.getItem("userinfo")).propic)
    }, [JSON.parse(localStorage.getItem("userinfo")).propic])

    return (
        <div style={{ backgroundColor: "#00acee" }} className="d-flex justify-content-between align-items-center w-100">

            <div>
                <ul className="nav d-flex align-items-center">
                    <li className="nav-item d-flex align-items-center">
                        <Link to={"/home"}>
                            <FontAwesomeIcon icon="fa-brands fa-twitter" className="text-light" style={{ fontSize: "55px", margin: "10px" }} />
                        </Link>
                        {/* <span className="h3 text-light">MiniTwitter</span> */}
                        <Link className="nav-link text-light h3" to="/home">MiniTwitter</Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="nav align-items-center">
                    <li className="nav-item userdatashow text-light">
                        <div className="user_info d-flex nav-link" style={{ padding: "0" }}>
                            <Link className="nav-link text-light d-flex align-items-center" to={`/${JSON.parse(localStorage.getItem("userinfo")).username}`}>
                                {userPropic && (
                                    <img style={{ maxWidth: "100%", width: "50px", height: "50px", borderRadius: "30px" }} src={`https://mini-twitter-app-deploy.herokuapp.com${userPropic}`} alt="Cinque Terre" />
                                )}
                                <h3 className="ms-2 text-light">{JSON.parse(localStorage.getItem("userinfo")).username}</h3>
                            </Link>
                        </div>
                    </li>
                    <div className="nav-item messagedivshow text-light" style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "25px", margin: "15px", cursor: "pointer" }} onClick={() => { setmakediffmes(false); setShowNot(false); setShowMessage(!ShowMessage); localStorage.setItem("meslength", mes.length); setSeenMsg(true) }} />
                        {mes.length - parseInt(localStorage.getItem("meslength")) > 0 ? <span style={{ position: 'absolute', left: '35px', backgroundColor: 'white', color: '#00acee', width: '22px', height: '25px', textAlign: 'center', borderRadius: '50%' }}>{mes.length - parseInt(localStorage.getItem("meslength"))}</span> : null}

                        {/* <button type="button" className={`btn ${makediffmes ? " btn-warning" : "btn-light"} btn-outline-dark `} style={{ color: "#36a2b9" }} onClick={() => { setmakediffmes(false); setShowNot(false); setShowMessage(!ShowMessage); localStorage.setItem("meslength", mes.length); }}>Messages</button> */}
                        <div className={ShowMessage ? "d-block" : "d-none"} style={{ position: "absolute", width: "400px", height: "600px", left: "-200px", top: "75px", overflowX: "auto", backgroundColor: "#00acee", zIndex: "2", color: "whitesmoke", borderRadius: "6px" }}>
                            <h3 className="m-3">Messages</h3>
                            {mes.map((e) => {
                                return (
                                    <div className="message d-flex" style={{ borderBottom: "1px solid lightgray", padding: "5px", paddingTop: "10px" }} onClick={() => { window.location.href = `/message/${e.from}` }}>
                                        {e.propic ? (
                                            <img src={`https://mini-twitter-app-deploy.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        ) : (
                                            <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                        )}
                                        <div>
                                            <h2>{e.from}</h2>
                                            <p style={{ fontSize: "20px" }}>{e.message}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="nav-item messagedivshow text-light" style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faBell} style={{ fontSize: "25px", margin: "15px", cursor: "pointer" }} onClick={() => { setmakediffnot(false); setShowMessage(false); setShowNot(!ShowNot); setSeenNot(true); localStorage.setItem("notlength", not.length); }} />
                        {not.length - parseInt(localStorage.getItem("notlength")) > 0 ? <span style={{ position: 'absolute', left: '28px', backgroundColor: 'white', color: '#00acee', width: '22px', height: '25px', textAlign: 'center', borderRadius: '50%' }}>{not.length - parseInt(localStorage.getItem("notlength"))}</span> : null}
                        {/* <button type="button" className={`btn ${makediffnot ? "btn-warning" : "btn-light"} ms-2 me-2 btn-outline-dark`} style={{ color: "#36a2b9" }} onClick={() => { setmakediffnot(false); setShowMessage(false); setShowNot(!ShowNot); localStorage.setItem("notlength", not.length); }} >Notifications</button> */}
                        <div className={ShowNot ? "d-block" : "d-none"} style={{ position: "absolute", width: "400px", height: "600px", left: "-255px", top: "75px", overflowX: "auto", backgroundColor: "#00acee", zIndex: "2", color: "whitesmoke", borderRadius: "6px" }}>
                            <h3 className="m-3">Notifications</h3>
                            {not.map((e) => {
                                return (
                                    <>
                                        {e.id ? (
                                            <div className="message d-flex" onClick={() => { window.location.href = `/tweet/${e.id}` }}>
                                                {e.propic ? (
                                                    <img src={`https://mini-twitter-app-deploy.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                                ) : (
                                                    <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                                )}
                                                <div>
                                                    <h2>{e.username}</h2>
                                                    <p style={{ fontSize: "20px" }}>{e.action} your tweet</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="message d-flex" onClick={() => { window.location.href = `/${e.username}` }}>
                                                {e.propic ? (
                                                    <img src={`https://mini-twitter-app-deploy.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                                ) : (
                                                    <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginLeft: "15px", marginRight: "15px" }} />
                                                )}
                                                <div>
                                                    <h2>{e.username}</h2>
                                                    <p style={{ fontSize: "20px" }}>{e.action} you</p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )
                            })}
                        </div>
                    </div>


                    <li className="nav-item tweetbutton text-light">
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: "25px", margin: "15px", cursor: "pointer" }} onClick={() => { setshowCreate(!showCreate) }} />
                        {/* <button className="btn"  style={{ color: "#36a2b9" }} >Tweet</button> */}

                        <CreateTweetContext.Provider value={{ showCreate, setshowCreate }}>
                            <CreateTweet />
                        </CreateTweetContext.Provider>
                    </li>



                    <Dropdown >
                        <Dropdown.Toggle style={{ backgroundColor: "#00acee", marginRight: "15px", border: "none" }} variant="success" id="dropdown-basic">

                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/message">
                                <Link to="/message" ><button className="btn" style={{ color: "#36a2b9" }}>Start A Message</button></Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="/explore">
                                <Link to="/explore" ><button className="btn" style={{ color: "#36a2b9" }}>Explore</button></Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="/logout">
                                <Link to="/logout" ><button className="btn" style={{ color: "#36a2b9" }}>Logout</button></Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </ul>
            </div >



        </div >


    )
}

export default NavBar;