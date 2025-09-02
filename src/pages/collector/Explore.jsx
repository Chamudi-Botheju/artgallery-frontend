import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Explore = () => {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/artworks");
        setArtworks(res.data);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Explore Artworks
      </Typography>
      <Grid container spacing={3}>
        {artworks.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork.id}>
            <Card
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
              onClick={() => navigate(`/collector/artwork/${artwork.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000${artwork.image_url}`} // ensure backend serves /uploads
                alt={artwork.title}
              />
              <CardContent>
                <Typography variant="h6">{artwork.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {artwork.artist_name}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  ${artwork.price}
                </Typography>
              </CardContent>
              <Box p={1} display="flex" justifyContent="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    navigate(`/collector/artwork/${artwork.id}`);
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
