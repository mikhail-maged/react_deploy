import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Tweets from "../Components/Tweets";
import User from "../Components/User";

function ParticularTweet() {

    const params = useParams();

    //users
    const [tweet, settweet] = useState({})


    //fetch users
    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app-deploy.herokuapp.com/gettweetbyid/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { settweet(res.data.showtweet) })
                .catch((err) => console.log(err))
        }, 1000)

        return () => clearInterval(interval);

    }, [params.id])


    return (
        <>
            <NavBar />
            <div>

                {tweet.id && <Tweets key={tweet.id} content={tweet} />}



            </div>
        </>
    )
}

export default ParticularTweet