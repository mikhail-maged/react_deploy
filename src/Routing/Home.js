import React from "react";
import { Redirect } from "react-router-dom";
import TweetsList from "../Components/TweetsList";
import NavBar from "../Components/NavBar";


function Home() {


    return (
        <>
            {!localStorage.getItem("auth") ? <Redirect to='/' /> : (
                <>
                    <NavBar />
                    <TweetsList />

                </>
            )}
        </>
    )
}

export default Home