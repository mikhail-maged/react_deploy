import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Tweets from "../Components/Tweets";

function Replies() {

    //get username
    const Params = useParams();

    //holding post state
    const [user, setUser] = useState([])
    const [tweets, setTweets] = useState([])

    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    console.log(tokenaccess);
    //fetch tweets each sec
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app-deploy.herokuapp.com/reply/${Params.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { setTweets(res.data.tweetlist); setUser(res.data.userinfo) })
                .catch((err) => console.log(err))
        }, 1000);






        return () => clearInterval(interval);
    }, [Params.username])



    //follow action
    const followaction = () => {
        axios.get(`https://mini-twitter-app-deploy.herokuapp.com/follow/${Params.username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {!localStorage.getItem("auth") ? <Redirect to='/' /> : (
                <>
                    <NavBar />
                    <div className="d-flex align-items-center" style={{ margin: "70px", position: "relative" }}>
                        {!user.propic ? (
                            <img src="https://via.placeholder.com/350x150" alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                        ) : (
                            <img src={`https://mini-twitter-app-deploy.herokuapp.com${user.propic}`} alt="" style={{ marginLeft: "15px", borderRadius: "80px", width: "150px", height: "150px" }} />
                        )}

                        <div style={{ marginLeft: "25px" }}>
                            <h1 >{user.firstname} {user.lastname}</h1>
                            <h2 >{user.email}</h2>
                            <h3 style={{ wordWrap: "break-word", width: "30%" }}>{user.bio}</h3>
                            <Link className="text-decoration-none" to={`/${Params.username}/following`}><span className="h5 me-5">Following : {user.following}</span></Link>
                            <Link className="text-decoration-none" to={`/${Params.username}/followers`}><span className="h5">Followers : {user.followers}</span></Link>
                            <Link className="text-decoration-none ms-5 me-5" to={`/${Params.username}/replies`}><span className="h5">Replies</span></Link>
                            <Link className="text-decoration-none" to={`/${Params.username}/likes`}><span className="h5">Likes</span></Link>
                            {JSON.parse(localStorage.getItem("userinfo")).username === Params.username ? (
                                <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "40%", left: "75%", width: "15%", backgroundColor: "#00acee" }} onClick={() => { window.location.href = "/profile" }}>Edit</button>)
                                : user.ifollow ? <button type="button" className="btn btn-light" style={{ borderRadius: "20px", color: "white", position: "absolute", top: "40%", left: "75%", width: "15%", backgroundColor: "#00acee" }} onClick={() => { followaction() }}>Unfollow</button> :
                                    <button type="button" className="btn btn-light" style={{ border: "2px solid #00acee", borderRadius: "20px", color: "#00acee", position: "absolute", top: "40%", left: "75%", width: "15%", backgroundColor: "white" }} onClick={() => { followaction() }}>Follow</button>}
                        </div>
                    </div>
                    {tweets.map((e) => {
                        return (
                            <Tweets key={e.id} content={e} />
                        )
                    })}

                </>
            )}
        </>
    )
}

export default Replies