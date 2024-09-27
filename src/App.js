import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Feed, SearchFeed, ChannelDetails, VideoDetails } from "./components";
import NavbarField from "./components/NavbarField";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#21242D" }}>
      <NavbarField />

      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </Box>
  );
};

export default App;
