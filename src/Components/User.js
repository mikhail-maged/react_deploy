import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";


function User(Props) {


    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    const followaction = () => {
        axios.get(`https://mini-twitter-app-deploy.herokuapp.com/follow/${Props.info.username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
        // .then((res) => { console.log(res.data, res.status); })
        // .catch((err) => console.log(err))
    }

    return (
        <div className="follower m-4 p-3" style={{ border: "1px solid lightskyblue", borderRadius: "4px", position: "relative" }} onClick={() => { window.location.href = `/${Props.info.username}` }}>
            {Props.info.propic ? (
                <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.info.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            ) : (
                <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            )}

            <h1>{Props.info.username}</h1>
            <Link className="text-decoration-none me-3" to={`/${Props.info.username}/followers`} onClick={e => { e.stopPropagation() }}><span className="h5">Followers : {Props.info.followers}</span></Link>
            {Props.info.ifollow ? <button type="button" className="btn btn-light" style={{ borderRadius: "20px", color: "white", position: "absolute", top: "70%", left: "75%", width: "20%", backgroundColor: "#00acee" }} onClick={(e) => { e.stopPropagation(); followaction(); }}>Unfollow</button>
                :
                <button type="button" className="btn" style={{ borderRadius: "20px", color: "#00acee", position: "absolute", top: "70%", left: "75%", width: "20%", backgroundColor: "#f8f9fa", border: "1px solid #00acee" }} onClick={(e) => { e.stopPropagation(); followaction(); }}>Follow</button>}

            {/* <button type="button" className="btn btn-light" style={{ color: "white", position: "absolute", top: "70%", left: "75%", width: "20%", backgroundColor: "#00acee" }} onClick={(e) => { e.stopPropagation(); followaction(); }}>{Props.info.ifollow ? "Unfollow" : "Follow"}</button> */}
        </div >
    )
}

export default User;