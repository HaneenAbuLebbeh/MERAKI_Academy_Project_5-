import React , {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material'
import "./users.css"

const Users = () => {
 
 const [userdata, setuserdata] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/usersInfo`

        ).then((res)=>{
          console.log(res)
          console.log(res.data.result)
          setuserdata(res.data.result)
        
        }).catch((err)=>{
          //seterror1(err.response.data.message)
          console.log(err)
          
        
      })},[])  

      

      





  return (
    <>
    <Typography variant="h4" gutterBottom align="center">
        Spot Seekers Users Information
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">ID</TableCell>
              <TableCell className="table-header">First Name</TableCell>
              <TableCell className="table-header">Last Name</TableCell>
              <TableCell className="table-header">Age</TableCell>
              <TableCell className="table-header">Email</TableCell>
              <TableCell className="table-header">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdata.map((user) => (
              <TableRow key={user._id} className="table-row">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.email || 'N/A'}</TableCell>
                <TableCell>{user.country || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </>
);
};
  


export default Users