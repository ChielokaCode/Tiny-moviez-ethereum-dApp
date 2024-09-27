import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Button, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      console.log("Navigating to Search URL - ", `/search/${searchTerm}`);
      navigate(`/search/${searchTerm}`);

      setSearchTerm("");
    }
  };
  return (
    <>
      <Stack direction="row" rowGap="2px">
        <Paper
          component="form"
          onSubmit={onhandleSubmit}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            boxShadow: "none",
            mr: { sm: 5 },
          }}
        >
          <input
            className="search-bar"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            placeholder="Search Here..."
          />
          <IconButton type="submit" sx={{ p: "10px", color: "#50a8c0" }}>
            <Search />
          </IconButton>
        </Paper>

        <button
          style={{
            backgroundColor: "#50a8c0",
            color: "#fff",
            borderRadius: "2rem",
            fontSize: "1rem",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
          }}
        >
          <h2>Connect Wallet</h2>
        </button>
      </Stack>
    </>
  );
};

export default SearchBar;
