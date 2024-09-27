import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        background: "#000",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#fff" }}>TINY-MOVIEZ</h2>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
