import React, { useContext, useState, useEffect ,useRef } from 'react';
import { SocketContext } from "./SocketMessages"
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem,Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { FaRegCommentDots } from 'react-icons/fa'
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
    const messageEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

console.log(socket)
/* useEffect(()=>{
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
        } */

       /*  const messageHandler = (data) => {
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
    }; */
    useEffect(() => {
        axios.get(`http://localhost:5000/users/userinfo/${user_id}`).then((res) => {
            setuserinfo(res.data.user);
            setuserFirstname(res.data.result[0].firstname);
            setuserLastname(res.data.result[0].lastname);
        }).catch((err) => {
            console.log(err);
        });
    }, [user_id]);

    useEffect(() => {
        if (!socket) {
            console.error("Socket is not initialized");
            return;
        }
        if (socket) {
            socket.emit('joinRoom', `room-${tourstGuideId}`);
        }

        const messageHandler = (data) => {
            const { from, to, message, senderFirstname, senderLastname } = data;
            setAllMessages(prevMessages => [...prevMessages, data]);

           
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const typingHandler = (data) => {
            setIsTyping(data.isTyping);
        };

        socket.on("message", messageHandler);
        socket.on("typing", typingHandler);

        return () => {
            socket.off("message", messageHandler);
            socket.off("typing", typingHandler);
        };
    }, [socket, tourstGuideId]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("message", {
                to: tourstGuideId,
                from: user_id,
                message,
                senderFirstname: userFirstname,
                senderLastname: userLastname
            });
            setMessage(""); 
        }
    };

    const handleTyping = () => {
        if (message.trim()) {
            socket.emit("typing", { isTyping: true, room: `room-${tourstGuideId}` });
        } else {
            socket.emit("typing", { isTyping: false, room: `room-${tourstGuideId}` });
        }
    };



    return (
        <div>
        
        <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                borderRadius: '50%',
                width: 60,
                height: 60,
                backgroundColor: '#0084FF',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                '&:hover': {
                    backgroundColor: '#0078D4',
                },
            }}
        >
            <FaRegCommentDots size={30} />
        </Button>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Messages</DialogTitle>
            <DialogContent
                style={{
                    maxHeight: '400px',
                    overflowY: 'auto',  
                }}
            >
                <Box>
                    {allMessages.map((msg, index) => (
                        <Box key={index} style={{
                            display: 'flex',
                            justifyContent: msg.from === user_id ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}>
                            <Box
                                style={{
                                    maxWidth: '60%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: msg.from === user_id ? '#0078FF' : '#E4E6E7',
                                    color: msg.from === user_id ? 'white' : 'black',
                                    wordWrap: 'break-word',
                                }}
                            >
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                    {msg.senderFirstname} {msg.senderLastname}
                                </Typography>
                                <Typography variant="body2">{msg.message}</Typography>
                            </Box>
                        </Box>
                    ))}
                   
                    <div ref={messageEndRef} />
                </Box>
                {isTyping && (
                    <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                        Tour Guide is typing...
                    </Typography>
                )}
                <TextField
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping(); 
                    }}
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