import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./chat.css"
import db from './firebase';
import {useStateValue} from './StateProvider';
import firebase from "firebase";

function Chat() {
    const [input,setInput]=useState("");
    const [face,setFace] = useState(" ");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue("");

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        })
        setInput("");
    };

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                setRoomName(snapshot.data().name)
            );
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    },[roomId])
    useEffect(()=>{
        setFace(Math.floor(Math.random() * 5000));
    },[]);
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${face}.svg`}/>
                <div className="chat_headerInfo">
                    <h3> {roomName}</h3>
                    <p className='chat-room-last-seen' > 
                          Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toLocaleTimeString()}</p>
                </div>
          
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat_body">
                {
                    messages.map((message => (
                <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}

                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                    </span>
                </p>
                 )))
                }
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="write a message..."/>
                    <button type="submit" onClick={sendMessage} >Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
