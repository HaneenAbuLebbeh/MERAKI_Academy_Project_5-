import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./category.css"
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Snackbar,
  Paper,
  TextField,
  Button,
  Modal,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';   

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';


const CountriesManage = () => {
  
 
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({
    category_name: "",
    description: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    description: "",
    image_url: "",
  });
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/category`);
        setCategories(response.data.result); 1 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryName) => {
    try {
      await axios.delete(`http://localhost:5000/category/${categoryName}`);
      setCategories(categories.filter((category) => category.category_name !== categoryName));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleInputChange = (e) => {
    if (isEditing) {
      setEditedCategory({
        ...editedCategory,
        [e.target.name]: e.target.value,
      });
    } else {
      setNewCategory({
        ...newCategory,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEdit = (category) => {
    setEditedCategory(category);
    setIsEditing(true);
    setOpenEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/category/${editedCategory.category_name}`, editedCategory);
      setCategories(
        categories.map((category) =>
          category.category_name === editedCategory.category_name ? editedCategory : category
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:5000/category/add", newCategory);
      setCategories([...categories, newCategory]);
      setNewCategory({
        category_name: "",
        description: "",
        image_url: "",
      });
      setOpenAddCategoryModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  
  const addCategoryModalContent = (
    <Modal
      open={openAddCategoryModal}
      onClose={() => setOpenAddCategoryModal(false)}
      aria-labelledby="add-category-modal"
      aria-describedby="add-category-modal-description"
    >
      <Box sx={{ width: 400, mx: 'auto', mt: 5, padding: 3 }}>
        <Typography variant="h6">
          Add New Category
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="category-name"
          label="Category Name"
          name="category_name"
          value={newCategory.category_name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={newCategory.description}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="image-url"
          label="Image URL"
          name="image_url"
          value={newCategory.image_url}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
    </Modal>
  );
  return (
    <div className="table-container">
    <Box sx={{ width: '95%', display: 'grid', gridTemplateColumns: '200px 1fr', marginLeft:"50px",marginRight:"20px" }}>
      
      <Sidebar className="sidebar" />
      <Box/>
      
      <div className='table'>
      
      <TableContainer component={Paper}>
      <h1 className="manage-title" style={{marginTop:"20px"}}>Manage Categories</h1>
      <div className="content">

<Button className="add-product-button" variant="contained" onClick={() => setOpenAddCategoryModal(true)}>
  Add New Category
</Button>

{addCategoryModalContent}
</div>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow style={{backgroundColor:"##F4F4F4", border:"2px  solid #D8D8D8"}}>
              <TableCell style={{fontWeight:"Bold"}}>Category Name</TableCell>
              <TableCell style={{fontWeight:"Bold"}}>Description</TableCell>
              <TableCell style={{fontWeight:"Bold"}}>Image </TableCell>
              <TableCell style={{fontWeight:"Bold"}} >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.category_name}>
                {isEditing && editedCategory.category_name === category.category_name ? (
                  <>
                    <TableCell>
                      <TextField
                        name="category_name"
                        value={editedCategory.category_name}
                        onChange={handleInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="description"
                        value={editedCategory.description}
                        onChange={handleInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="image_url"
                        value={editedCategory.image_url}
                        onChange={handleInputChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                      </Button>
                      <Button variant="text" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell><img src={category.image_url} className="cat-img"style={{width:"100px", height:"100px",borderRadius:"2rem" }}/>
              
          </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(category)}>
                        <EditIcon style={{color:"green"}} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(category.category_name)}>   

                        <DeleteIcon style={{color:"red"}}/>
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      {/* <Typography variant="h6" sx={{ mt: 2 }}>
        Add New Category
      </Typography>
      <form onSubmit={handleAddCategory}>
        <TextField
          name="category_name"
          label="Category Name"
          value={newCategory.category_name}
          onChange={handleInputChange}
          sx={{ width: '100%' }}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={newCategory.description}
          onChange={handleInputChange}
          sx={{ width: '100%', mt: 1 }}
        />
        <TextField
          name="image_url"
          label="Image URL"
          value={newCategory.image_url}
          onChange={handleInputChange}
          sx={{ width: '100%', mt: 1 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Category
        </Button>
      </form> */}
    </Box>
    </div>
  );
};


export default CountriesManage;




