import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateRetweet from "./CreateRetweet";
import { CreateRetweetContext } from "./CreateRetweetContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faHeart, faTrash, faComment, faImage } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faRetweet, faHeart, faTrash, faComment, faImage)
function Tweets(Props) {

    const [showform, setshowform] = useState(false)

    //make reply state
    const [reply, setReply] = useState("")

    //show retweet state
    const [makeRetweet, setmakeRetweet] = useState(false)


    //reply form handler
    const formhandler = (e) => {
        e.preventDefault();
        //chek states
        if (reply) {
            let from1 = new FormData()
            from1.append('message', reply)
            let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
            axios.post(`https://mini-twitter-app-deploy.herokuapp.com/createreply/${Props.content.id}`, from1, {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { setReply(""); })
                .catch((err) => { setReply(""); console.log(err) })
        }
    }

    //show retweet handler
    const retweet = () => {
        setmakeRetweet(!makeRetweet)
    }

    const showForm = (e) => {
        let reply = e.target.parentElement.parentElement.parentElement.nextElementSibling
        console.log(reply)
        if (showform === true) {
            reply.style.display = 'none'
            setshowform(false)
        }
        else {
            reply.style.display = 'block'
            setshowform(true)

        }

    }

    //like form handler
    const likehandler = () => {
        let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
        axios.post(`https://mini-twitter-app-deploy.herokuapp.com/tweetaction/${Props.content.id}`, { "action": "like" }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { console.log(res.data); })
            .catch((err) => console.log(err))
    }


    return (
        <>
            <div className="tweet p-1" id={Props.content.id} style={{
                border: "2px solid lightgrey", borderRadius: "15px", width: "60%", margin: "auto",
                marginBottom: "20px", marginTop: "20px", boxShadow: "2px 2px 2px 2px #00acee"
            }}>
                <div className="user_info d-flex p-4" onClick={() => { window.location.href = `/${Props.content.username}` }}>
                    {Props.content.userpic && (
                        <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.content.userpic}`} alt="Cinque Terre" style={{ maxWidth: "100%", width: "60px", height: "60px", borderRadius: "30px" }} />
                    )}
                    <h3 className="ms-2">{Props.content.username}</h3>
                </div>
                <div className="content mb-2 text-center">
                    <p className="h3">{Props.content.content}</p>
                    {Props.content.image && (
                        <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.content.image}`} className="rounded mx-auto" alt="Cinque Terre" width="35%" />
                    )}
                </div>

                {Props.content.parent_user && (
                    <div className="parent p-4" style={{ border: "1px solid lightskyblue", borderRadius: "15px", width: "60%", margin: "auto" }}>
                        <div className="user_info d-flex p-2" onClick={() => { window.location.href = `/${Props.content.parent_user}` }}>
                            {Props.content.parent_user_image && (
                                <Link to={`/${Props.content.parent_user}`}>
                                    <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.content.parent_user_image}`} alt="Cinque Terre" style={{ maxWidth: "100%", width: "60px", height: "60px", borderRadius: "30px" }} />
                                </Link>
                            )}
                            <h3 className="ms-2">{Props.content.parent_user}</h3>
                        </div>
                        <div className="content mb-4 text-center">
                            <p className="h3">{Props.content.parent_content}</p>

                            {Props.content.parent_image && (
                                <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.content.parent_image}`} className="rounded mx-auto" alt="Cinque Terre" width="35%" />
                            )}

                        </div>
                    </div>
                )}



                <div className="action d-flex justify-content-around m-5 ">
                    <div>
                        <FontAwesomeIcon className={`text-${Props.content.iliked ? "danger" : "dark"} h4`} onClick={() => likehandler()} icon="fa-solid fa-heart" />
                        {Props.content.likes}
                        {/* <button type="button" className={`col btn btn-outline-${Props.content.iliked ? "light" : "dark"} text-dark`} onClick={() => likehandler()}>{Props.content.likes} like</button> */}
                    </div>
                    <div>
                        <FontAwesomeIcon className={`text-${makeRetweet ? "success" : "dark"} h4`} onClick={() => retweet()} icon="fa-solid fa-retweet" />
                        {Props.content.retweetscount}
                        {/* <button type="button" className="col btn btn-outline-light text-dark" onClick={() => retweet()}>{Props.content.retweetscount} retweet</button> */}
                    </div>
                    <div>
                        <FontAwesomeIcon className="h4" icon="fa-solid fa-comment" onClick={(e) => showForm(e)} />
                        {Props.content.reply.length}
                    </div>
                </div>

                <div style={{ display: 'none' }}>
                    <div className="commentshow px-2">
                        <div className="d-grid gap-2 pe-5 mt-2">
                            {Props.content.reply.map((e) => {
                                return (
                                    <>
                                        <div key={e.id} className="p-2 bg-light border h5 d-flex align-items-center rounded w-75 mx-auto mt-3" onClick={() => { window.location.href = `/${e.by}` }}>
                                            {e.propic ? (
                                                <img src={`https://mini-twitter-app-deploy.herokuapp.com${e.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px", marginRight: "20px" }} />
                                            ) : (
                                                <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px", marginRight: "20px" }} />
                                            )}
                                            <div className="mt-3" >
                                                <p className="h4">{e.by} : </p>
                                                <p className="h5">{e.message}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>

                    <div className="comments" style={{ marginBottom: "15px" }}>
                        <form style={{ width: "75%", marginLeft: "90px", padding: "20px" }} onSubmit={e => formhandler(e)}>
                            <div>
                                <textarea className="form-control mb-3" id="exampleFormControlTextarea1" style={{ resize: "none", height: "65px", borderRadius: "15px" }} value={reply} rows="3" name='replymessage' onChange={(e) => setReply(e.target.value)} />
                            </div>
                            <button type="submit" style={{ width: "20%", backgroundColor: "#00acee", borderRadius: "25px" }} className="btn text-light">Reply</button>
                        </form>
                    </div>
                </div>
            </div>
            <CreateRetweetContext.Provider value={{ makeRetweet, setmakeRetweet }}>
                <CreateRetweet id={Props.content.id} />
            </CreateRetweetContext.Provider>

        </>
    )
}

export default Tweets;