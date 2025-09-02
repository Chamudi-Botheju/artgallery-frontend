// src/pages/collector/ArtworkDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Card, CardContent, CardMedia, TextField } from "@mui/material";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchArtwork = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/artworks/${id}`);
      setArtwork(res.data);
    } catch (err) {
      console.error("Error fetching artwork:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHighestBid = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/highest/${id}`);
      setHighestBid(res.data.highest_bid);
    } catch (err) {
      console.error("Error fetching highest bid:", err);
    }
  };

  useEffect(() => {
    fetchArtwork();
    fetchHighestBid();
  }, [id]);

  const handleOrder = async () => {
    if (!artwork) return;
    try {
      await axios.post("http://localhost:5000/api/orders/order", {
        artwork_id: artwork.id,
        price: artwork.price,
      });
      alert("Order placed successfully!");
      fetchArtwork();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  const handleBid = async () => {
    if (!bidAmount) return alert("Enter a bid amount");
    try {
      await axios.post("http://localhost:5000/api/orders/bid", {
        artwork_id: artwork.id,
        amount: bidAmount,
      });
      alert("Bid placed successfully!");
      setBidAmount("");
      fetchHighestBid();
    } catch (err) {
      console.error(err);
      alert("Failed to place bid");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!artwork) return <Typography>Artwork not found.</Typography>;

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={`http://localhost:5000/${artwork.image_url}`}
          alt={artwork.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{artwork.title}</Typography>
          <Typography variant="body1" gutterBottom>{artwork.description}</Typography>
          <Typography variant="h6" color="primary">Price: ${artwork.price}</Typography>
          <Typography variant="h6" color="secondary">
            Highest Bid Yet: ${highestBid || "No bids yet"}
          </Typography>

          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" color="success" onClick={handleOrder} disabled={artwork.status === 'sold'}>
              Place Order
            </Button>
            <TextField
              label="Your Bid"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <Button variant="outlined" color="secondary" onClick={handleBid} disabled={artwork.status === 'sold'}>
              Place Bid
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ArtworkDetail;
