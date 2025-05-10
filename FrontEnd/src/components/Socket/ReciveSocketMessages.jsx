import React, { useContext, useState, useEffect,useRef  } from 'react';
import { SocketContext } from './SocketMessages';
/* import { registerContext } from '../App'; */
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem,IconButton ,Badge ,Box} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";






const ReceiveSocketMessages = ({ openChat, handleCloseChat }) => {
    const [userFirstname, setuserFirstname] = useState("")
        const [userLastname, setuserLastname] = useState("")
        const [unreadMessages, setUnreadMessages] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const messageEndRef = useRef(null);
    const { socket, connectAsSeller } = useContext(SocketContext);
    const user_id=useSelector((initialState)=> initialState.login.userId)
    const tourstGuideId = 35
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const customerIdRef = useRef(null)
    const [isTyping, setIsTyping] = useState(false);
console.log(user_id)
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/userinfo/${tourstGuideId}`).then((res)=>{
          
          console.log(res.data.user)
          setuserFirstname(res.data.result[0].firstname)
          setuserLastname(res.data.result[0].lastname)

        }).catch((err)=>{
          
          console.log(err)
        
      })},[])  



console.log(userFirstname,userLastname)







    useEffect(() => {
        if (socket) {
            
            socket.emit('joinRoom', `room-${tourstGuideId}`);
            console.log(`Seller joined room: room-${tourstGuideId}`);
            console.log("Socket connected:", socket.id);
            
            const messageHandler = (data) => {
                const { from, to, message,senderFirstname, senderLastname } = data;
                console.log(`Received message from User ID: ${from}, to Guide ID: ${to}`);
                
                 customerIdRef.current=from
                console.log(customerIdRef.current)
                
                setAllMessages(prevMessages => [...prevMessages, data]);
            };
        
            socket.on("message", messageHandler);
        
            return () => {
                socket.off("message", messageHandler);
            };
        } else {
            console.log("Socket is not connected.");
        }
    }, [socket, user_id]);

    const sendMessage = () => {
        const customerId=customerIdRef.current
        if (message.trim() && user_id) {
            socket.emit("message", { to: customerId ,from: tourstGuideId, message ,
                senderFirstname: userFirstname, 
                senderLastname: userLastname
            });
            setMessage(""); 
        }
    };
  /*   const openChat = () => {
        setIsModalOpen(true);
        setUnreadMessages(0); // Reset unread message count when modal opens
    }; */

    return (
        <div>
            
            <Dialog open={openChat} onClose={handleCloseChat} maxWidth="sm" fullWidth>
                <DialogTitle>Messages</DialogTitle>
                <DialogContent
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto', 
                    }}
                >
                    <Box>
                        {allMessages.map((msg, index) => (
                            <Box
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.from === tourstGuideId ? 'flex-end' : 'flex-start',
                                    marginBottom: '10px',
                                }}
                            >
                                <Box
                                    style={{
                                        maxWidth: '60%',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        
                                        backgroundColor: msg.from === tourstGuideId ? '#0078FF' : '#E4E6E7', 
                                        color: msg.from === tourstGuideId ? 'white' : 'black',
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

                    
                    <TextField
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} 
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseChat}>Close</Button>
                    <Button onClick={sendMessage} color="primary">Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReceiveSocketMessages;
