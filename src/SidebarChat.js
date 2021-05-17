import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import './sidebarChat.css';
import {Link} from "react-router-dom";

function SidebarChat({id,name,addNewChat}) {
    const [face,setFace] = useState(" ");
    const [messages, setmessages] = useState("");
    useEffect(()=>{
        setFace(Math.floor(Math.random() * 5000));
    },[]);

    const creatChat = () => {
        const roomName = prompt("please enter name for chat");

        if (roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    };

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
                setmessages((snapshot.docs.map((doc)=>doc.data())))
            ))
        }
    },[id])

    return  !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${face}.svg`}/>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={creatChat} className="SidebarChat" style={{marginLeft:"20px"}}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
