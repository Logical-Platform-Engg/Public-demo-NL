import "./App.css";
import DataTable from "./components/dataTable";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { Person } from "@mui/icons-material";
import * as React from "react";
import SimpleDialog from "./components/dialog";
import SearchComponent from "./components/SearchComponent";

import logo from './images/logo.jpg';

function App() {
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

  return (
    <div className="App">
    <img src={logo} alt="Netlogic Logo" style={{height:"100px",width:"100px",position:"fixed", left:15, top:15}}/>
      <Box sx={{position:"fixed", right:20, bottom:5}}>
        <p>© 2024 All rights reserved.</p>
      </Box>
      <header className="App-header">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              color="primary"
              aria-label="Profile"
              disableFocusRipple="false"
              disableRipple="true"
              edge="true"
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
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

              marginRight: 2,
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
          <Box sx={{
            height:"100%",
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"end"
          }}>
            <Box
              sx={{
                display: "flex",
                width: "auto",
                alignItems: "center",
                justifyContent: "center",
                marginY: 2,
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  height: 20,
                  width: 100,
                  marginRight: 2,
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
          <SearchComponent setIsTableVisible={setIsTableVisible}/>
        )}
      </header>
    </div>
  );
}

export default App;
