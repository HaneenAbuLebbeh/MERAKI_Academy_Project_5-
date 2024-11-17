import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

console.log(imageUrl)



  return (
    <div>
      AdminPanel

<div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div> 

    </div>
  )
}

export default AdminPanel