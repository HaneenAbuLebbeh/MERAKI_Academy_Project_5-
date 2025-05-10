import React , {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress,Button,  Grid2,
  Card,
  CardContent,
  IconButton,
  Divider, Collapse } from '@mui/material'
import "./users.css"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import "./users.css";
const Users = () => {
  const userId=useSelector((initialState)=> initialState.login.userId)
 const [userdata, setuserdata] = useState([])
 const [image, setimage] = useState("")
 const [expandedComments, setExpandedComments] = useState({});
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/usersInfo`

        ).then((res)=>{
          console.log(res)
          console.log(res.data.result)
          setuserdata(res.data.result)
        
        }).catch((err)=>{
          
          console.log(err)
          
        
      })},[])  

      
 

const handleDeleteComment = async (userId, comment) => {
  try {
    
    await axios.delete(`http://localhost:5000/review/${userId}`, {
      data: { userId, comment },
    });

    
    setuserdata((prevState) =>
      prevState.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            comments: user.comments.filter((item) => item !== comment),
          };
        }
        return user;
      })
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

const handleDeleteUser = async (userId) => {
  try {
    
    await axios.delete(`http://localhost:5000/users/delete/${userId}`);
    console.log(`User with ID ${userId} deleted successfully.`);
    
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

  return (
    <>
   <Sidebar />
      <div className="content-wrapper">
        <div className="header-container">
          <Typography variant="h4" gutterBottom align="center" id="info">
            Spot Seekers Users Information
          </Typography>
        </div>

        <div className="user-cards-container">
          {userdata.map((user) => (
            <div className="user-card-wrapper" key={user._id}>
              <Card className="user-card">
                <CardContent>
                  <div className="user-image">
                    <img
                      src={user.image || '/default-image.png'}
                      alt="User"
                      className="circle-image"
                    />
                  </div>
                  <Typography variant="h6">{`${user.firstname} ${user.lastname}`}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {user.age} | Email: {user.email || 'N/A'}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="body1" gutterBottom>
                    <strong>Delete User</strong>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Comments:</strong>
                  </Typography>
                  <IconButton
                    onClick={() => setExpandedComments((prev) => ({
                      ...prev, 
                      [user._id]: !prev[user._id]
                    }))}
                    size="small"
                  >
                    {expandedComments[user._id] ? 'Hide Comments' : 'Show Comments'}
                  </IconButton>

                  <Collapse in={expandedComments[user._id]}>
                    <div className="comments-list">
                      {user.comments.length > 0 ? (
                        user.comments.map((comment, index) => (
                          <div className="comment-item" key={index}>
                            <Typography variant="body2" className="comment-text">
                              {comment}
                            </Typography>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteComment(user._id, comment)}
                              aria-label="delete"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No comments available.
                        </Typography>
                      )}
                    </div>
                  </Collapse>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

  


export default Users