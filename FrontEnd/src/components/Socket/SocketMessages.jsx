import React , {useState , useEffect,createContext, useContext} from 'react'
import socketInit from './soketServer'
import { useDispatch, useSelector } from "react-redux";

export const SocketContext=createContext()
const SocketMessages = ({ children }) => {
   
    const [socket, setsocket] = useState(null)
    const [isconnected, setisconnected] = useState(false)

const user_id=useSelector((initialState)=> initialState.login.userId)
const token=useSelector((initialState)=> initialState.login.token)
const tourstGuideId = 34

useEffect(() => {
    const newSocket = socketInit({ user_id, token });
    setsocket(newSocket);
console.log("Socket initialized:", newSocket)
    newSocket.on("connect", () => {
        console.log("socket connected");
        setisconnected(true);
        newSocket.emit('joinRoom', `room-${tourstGuideId}`);
    });

    newSocket.on("connect_error", (error) => {
        console.log(error.message);
        setisconnected(false);
    });

    return () => {
        newSocket.close();
        newSocket.removeAllListeners();
        setisconnected(false);
    };
}, [user_id, token]);
  return (
    <SocketContext.Provider value={{ socket }}>
   {children}
</SocketContext.Provider>

  )
}

export default SocketMessages  



