import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from "./SocketMessages"
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

const SendSocketMessages = () => {
    
    const {socket,connectAsUser } = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [userinfo, setuserinfo] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userFirstname, setuserFirstname] = useState("")
    const [userLastname, setuserLastname] = useState("")
    const user_id=useSelector((initialState)=> initialState.login.userId)
    const tourstGuideId = 35

console.log(socket)
useEffect(()=>{
    axios.get(`http://localhost:5000/users/userinfo/${user_id}`).then((res)=>{
      console.log(res.data.result[0].firstname)
      setuserinfo(res.data.user)
      setuserFirstname(res.data.result[0].firstname)
      setuserLastname(res.data.result[0].lastname) 

    }).catch((err)=>{
      
      console.log(err)
    
  })},[])  



console.log(userFirstname,userLastname)


    useEffect(() => {
        
        if (!socket) {
            console.error("Socket is not initialized");
            return;
        }
        if (socket) {
            socket.emit('joinRoom', `room-${tourstGuideId}`); 
            console.log(`User joined room: room-${tourstGuideId}`);
        }

        const messageHandler = (data) => {
            const { from, to, message,senderFirstname, senderLastname } = data;
            console.log(`Received message from User ID: ${from}, to Seller ID: ${to}`)


            console.log("Received message:", data);
            setAllMessages(prevMessages => [...prevMessages, data]);
        };

        socket.on("message", messageHandler);

        return () => {
            socket.off("message", messageHandler);
        };
    }, [socket,tourstGuideId]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("message", { to: tourstGuideId, from: user_id, message,senderFirstname: userFirstname, 
                senderLastname: userLastname });
            console.log("Message sent:", { to: tourstGuideId, from: user_id, message ,  senderFirstname: userFirstname, 
                senderLastname: userLastname
            })
            setMessage(""); 
        }
    };

    return (
        <div>
        <Button variant="outlined" onClick={() => setIsModalOpen(true)}>Open Chat</Button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Messages</DialogTitle>
            <DialogContent>
                <List>
                    {allMessages.map((msg, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">
                                {msg.senderFirstname} {msg.senderLastname}: {msg.message}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <TextField
                    placeholder='Reply'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                <Button onClick={sendMessage} color="primary">Send</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};


export default SendSocketMessages; 