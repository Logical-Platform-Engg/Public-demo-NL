import DataTable from "../components/dataTable";
import Paper from "@mui/material/Paper";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { Person, Menu as MenuIcon } from "@mui/icons-material";
import * as React from "react";
import SimpleDialog from "../components/dialog";
import SearchComponent from "../components/SearchComponent";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false); // State to control the drawer
  const [selectedValue, setSelectedValue] = React.useState();
  const [isTableVisible, setIsTableVisible] = React.useState(true);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setIsTableVisible(false);
  };

  const handleButtonClick = () => {
    navigate("/editor");
  };

  const handleSmartChatClick = () => {
    navigate("/smartchat");
  }
  const handleExternalLinkClick = () => {
    window.open("https://backstage-19034562779.us-central1.run.app", "_blank", "noopener,noreferrer");
  };

  const handleLogout = () => {
    // Perform logout logic here, such as clearing session or redirecting
    console.log("Logout clicked");
    // For example, redirect to login page
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMenuOpen(open);
  };

  const menuItems = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        border: "3px solid grey", // Adding border to the menu box
        height: "100vh",
        backgroundColor: "#f5f5f5",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space out the items and logout button
      }}
      role="presentation"
    >
      <Box>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          style={{ backgroundColor: "grey", color: "white", marginBottom: "10px", width: "100%" }}
        >
          Code Editor/Compiler
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "grey", color: "white", marginBottom: "10px", width: "100%" }}
          onClick={handleExternalLinkClick}
        >
          Templates
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "grey", color: "white", marginBottom: "10px", width: "100%" }}
          onClick={handleSmartChatClick}
        >
          Smart Chat
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "grey", color: "white", marginBottom: "10px", width: "100%" }}
          onClick={() => console.log("Button 1 Clicked")}
        >
          Button 1
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "grey", color: "white", marginBottom: "10px", width: "100%" }}
          onClick={() => console.log("Button 2 Clicked")}
        >
          Button 2
        </Button>
      </Box>
      <Button
        variant="contained"
        style={{ backgroundColor: "red", color: "white", width: "100%" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div className="Dashboard">
      {/* Position the drawer icon and logo inside a wrapper */}
      <Box
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
          display: "flex",
          alignItems: "center", // Align items to the center vertically
          zIndex: 1000, // Ensure it stays above other elements
        }}
      >
        {/* Drawer icon positioned before the logo */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{
            marginRight: "15px", // Space between icon and logo
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Keep the logo fixed next to the drawer icon */}
        <img
          src={logo}
          alt="Netlogic Logo"
          style={{
            height: "100px",
            width: "100px",
          }}
        />
      </Box>

      {/* Drawer for the menu */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>

      <Box sx={{ position: "fixed", right: 20, bottom: 5 }}>
        <p>© 2024 All rights reserved.</p>
      </Box>

      <div className="App-header">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              aspectRatio: 1,
            }}
          >
            <IconButton
              color="primary"
              aria-label="Profile"
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                height: 35,
                width: 35,
              }}
            >
              <Person />
            </IconButton>
          </Box>
          <Paper
            elevation={0}
            sx={{
              flex: 2,
              height: 20,
              padding: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(1px + 2vmin)",
            }}
          >
            <h2>SAND PLAY ZONE</h2>
          </Paper>
          <Box sx={{ flex: 1 }}></Box>
        </Box>
        {isTableVisible ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginY: 2,
                width: "100%",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  height: 20,
                  width: 100,
                  padding: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(1px + 2vmin)",
                }}
              >
                Sandbox
              </Paper>
              <IconButton
                color="primary"
                aria-label="Add Sandbox"
                sx={{
                  height: "fit-content",
                }}
                onClick={handleClickOpen}
              >
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "50%",
                    height: 20,
                    width: 20,
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GridAddIcon />
                </Paper>
              </IconButton>
              <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
            </Box>
            <DataTable />
          </Box>
        ) : (
          <SearchComponent setIsTableVisible={setIsTableVisible} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
