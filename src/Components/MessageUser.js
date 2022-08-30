import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";


function MessageUser(Props) {


    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action

    return (
        <div className="follower m-4 p-3" style={{ border: "1px solid lightskyblue", borderRadius: "4px", position: "relative" }} onClick={() => { window.location.href = `/message/${Props.info.username}` }}>
            {Props.info.propic ? (
                <img src={`https://mini-twitter-app-deploy.herokuapp.com${Props.info.propic}`} style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            ) : (
                <img src="https://via.placeholder.com/350x150" style={{ width: "80px", height: "80px", borderRadius: "80px" }} />
            )}

            <h1>{Props.info.username}</h1>
        </div >
    )
}

export default MessageUser;