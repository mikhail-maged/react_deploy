import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import MessageUser from "./MessageUser";

function MessageExplore() {

    //users
    const [users, setUsers] = useState([])


    //fetch users
    let tokenaccess = JSON.parse(localStorage.getItem("auth")).access
    //follow action
    useEffect(() => {
        axios.get(`https://mini-twitter-app-deploy.herokuapp.com/explore/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(tokenaccess)
            }
        })
            .then((res) => { setUsers(res.data.userlist) })
            .catch((err) => console.log(err))








    }, [])


    return (
        <>
            <NavBar />
            <div className="followers p-2 w-50 mx-auto mt-5 mb-5 rounded" style={{ backgroundColor: "ghostwhite", color: "#777" }}>


                {users.map((e) => {
                    return (
                        <MessageUser key={e.id} info={e} />
                    )
                })}

            </div>
        </>
    )
}

export default MessageExplore