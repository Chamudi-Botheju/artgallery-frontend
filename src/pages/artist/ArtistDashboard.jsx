import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ArtistDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Artist Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/artist/upload-artwork")}>
          Upload Artwork
        </Button>
        <Button variant="contained" onClick={() => navigate("/artist/reports")}>
          View Reports
        </Button>
        <Button variant="contained" onClick={() => navigate("/artist/orders")}>
          View Orders
        </Button>
      </Box>
    </Container>
  );
};

export default ArtistDashboard;
