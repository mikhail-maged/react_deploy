import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import User from "../Components/User";
function Follower() {


    const params = useParams();
    //users
    const [users, setUsers] = useState([])


    //fetch users
    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app-deploy.herokuapp.com/follower/${params.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { setUsers(res.data.followerslist) })
                .catch((err) => console.log(err))
        }, 1000);






        return () => clearInterval(interval);
    }, [params.username])


    return (
        <>
            <NavBar />
            <div className="followers p-2 w-50 mx-auto mt-5 mb-5 rounded" style={{ backgroundColor: "ghostwhite", color: "#777", minHeight: "300px" }}>
                {users.map((e) => {
                    return (
                        e ? <User key={e.id} info={e} /> : <p>No Users</p>
                    )
                })}
            </div>
        </>
    )
}

export default Follower