import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import User from "../Components/User";

function Explore() {

    //users
    const [users, setUsers] = useState([])


    //fetch users
    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://mini-twitter-app-deploy.herokuapp.com/explore/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(tokenaccess)
                }
            })
                .then((res) => { setUsers(res.data.userlist) })
                .catch((err) => console.log(err))
        }, 1000);

        return () => clearInterval(interval);
    }, [])


    return (
        <>
            <NavBar />
            <div className="followers p-2 w-50 mx-auto mt-5 mb-5 rounded" style={{ backgroundColor: "ghostwhite", color: "#777" }}>
                {users.map((e) => {
                    return (
                        <User key={e.id} info={e} />
                    )
                })}

            </div>
        </>
    )
}

export default Explore