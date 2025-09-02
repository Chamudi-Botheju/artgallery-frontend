import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";

const UploadArtwork = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/artworks", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error uploading artwork");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>Upload Artwork</Typography>
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField name="title" placeholder="Title" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
        <TextField name="description" placeholder="Description" fullWidth multiline rows={4} sx={{ mb: 2 }} onChange={handleChange} />
        <TextField name="price" type="number" placeholder="Price" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
        <input type="file" name="image" onChange={handleFileChange} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Upload</Button>
      </form>
    </Container>
  );
};

export default UploadArtwork;
