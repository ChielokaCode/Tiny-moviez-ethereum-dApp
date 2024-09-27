import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

const NavbarField = () => {
  const [pointList, setPointList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0); // State to store the sum of points

  const updatePoints = () => {
    const storedPointBalance = localStorage.getItem("PointBalance");

    if (storedPointBalance) {
      const parsedPoint = parseInt(storedPointBalance, 10);
      if (!isNaN(parsedPoint)) {
        // Add the parsed point to the existing pointList array
        setPointList((prevPoints) => [...prevPoints, parsedPoint]); // Append the new point to the array
        localStorage.removeItem("PointBalance");
      }
    }
  };

  // UseEffect to calculate the totalPoints when pointList changes
  useEffect(() => {
    const sumOfPoints = pointList.reduce((acc, point) => acc + point, 0); // Reduce the array to a sum
    setTotalPoints(sumOfPoints); // Update the state with the total
    console.log(totalPoints);
  }, [pointList]); // This effect runs whenever pointList is updated

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand style={{ color: "#fff" }} href="#">
          TINY-MOVIEZ
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ color: "#fff", backgroundColor: "#fff" }}
          className="bg-yellow-400"
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse
          style={{ color: "#fff" }}
          id="navbarScroll"
          className="bg-[#fff]"
        >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link style={{ color: "#fff" }} href="/">
              Home
            </Nav.Link>
            <Nav.Link style={{ color: "#fff" }} href="/rewards">
              Rewards
            </Nav.Link>
            <NavDropdown
              title={<span style={{ color: "#fff" }}>Account</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/signUp">Sign Up</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signIn">Sign In</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Log Out
            </Nav.Link> */}
          </Nav>
          <Stack direction="row" p={2}>
            <div>
              <button
                onClick={updatePoints}
                style={{
                  backgroundColor: "#50a8c0",
                  color: "#fff",
                  borderRadius: "2rem",
                  fontSize: "1rem",
                  paddingLeft: "0.75rem",
                  paddingRight: "0.75rem",
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
              >
                View Points
              </button>
            </div>
            <div style={{ marginRight: "2rem" }}>
              <h3 style={{ color: "#fff" }}>Point: </h3>
              <span style={{ color: "#fff", fontsize: "1.5rem" }}>
                <strong>{totalPoints}</strong>
              </span>
            </div>

            <SearchBar />
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarField;
