import DataTable from "../components/dataTable";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { Person } from "@mui/icons-material";
import * as React from "react";
import SimpleDialog from "../components/dialog";
import SearchComponent from "../components/SearchComponent";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";
const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [isTableVisible, setIsTableVisible] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setIsTableVisible(false);
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/editor");
  };
  const handleExternalLinkClick = () => {
    window.open("http://35.184.157.4:80", "_blank", "noopener,noreferrer");
  };
  return (
    <div className="Dashboard">
      <img
        src={logo}
        alt="Netlogic Logo"
        style={{
          height: "100px",
          width: "100px",
          position: "fixed",
          left: 15,
          top: 15,
        }}
      />

      <Button
        onClick={handleButtonClick}
        variant="contained"
        style={{
          height: "auto",
          width: "auto",
          position: "fixed",
          left: 15,
          top: 150,
        }}
      >
        Open Editor
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleExternalLinkClick}
        style={{
          height: "auto",
          width: "auto",
          position: "fixed",
          left: 15,
          top: 200,
        }}
      >
        Open External Link
      </Button>
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
            height:"60px",
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
          {/* Head Paper */}
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
