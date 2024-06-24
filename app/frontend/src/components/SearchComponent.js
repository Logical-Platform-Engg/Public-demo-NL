import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const SearchComponent = ({ setIsTableVisible }) => {
  const [value, setValue] = useState(null); 
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [machine_type, setmachine_type] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [name, setname] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  const handleConfigChange = (event) => {
    setmachine_type(event.target.value);
  };
  // const handleOwnerChange = (event) => {
  //   setOwner(event.target.value);
  // };

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setShowAdditionalFields(true);
  };
  console.log(process.env.REACT_APP_BACKEND_URL)
  const handleSubmit = () => {
    // Prepare the data to be sent
    const data = {
      owner,
      name,
      zone,
      machine_type,
    };

    // Show loading indicator
    setLoading(true);

    // Make a POST request to your API endpoint
    fetch(`${process.env.REACT_APP_BACKEND_URL}/terraform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to submit data');
      }
    })
    .then(data => {
      console.log('Data submitted successfully', data);
      setNotification({ open: true, message: data.message || "Response received successfully", severity: "success" });
      setLoading(false);
      setIsTableVisible(true);
      localStorage.setItem('res_details', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
      setNotification({ open: true, message: "Failed to receive response from server", severity: "error" });
      setLoading(false);
    });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        marginTop: 12,
        gap: 4,
      }}
    >
      <Autocomplete
        disablePortal
        value={value}
        onChange={handleAutocompleteChange}
        id="services-search-box"
        options={services}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search (/) for resources" />
        )}
      />
      {showAdditionalFields && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            id="owner_name"
            label="owner Name"
            variant="outlined"
            fullWidth
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            disabled={loading}
          />
          <TextField
            id="name"
            label="Instance Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setname(e.target.value)}
            disabled={loading}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="region-select-label">Region</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={region}
                label="Region"
                onChange={handleRegionChange}
                disabled={loading}
              >
                <MenuItem value={"us-central1"}>us-central1 (lowa)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="zone-select-label">Zone</InputLabel>
              <Select
                labelId="zone-select-label"
                id="zone-select"
                value={zone}
                label="Zone"
                onChange={handleZoneChange}
                disabled={loading}
              >
                <MenuItem value={"us-central1-a"}>us-central1-a</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="config-select-label">
              Machine Configuration
            </InputLabel>
            <Select
              labelId="config-select-label"
              id="config-select"
              value={machine_type}
              label="Machine Configuration"
              onChange={handleConfigChange}
              disabled={loading}
            >
              <MenuItem value={"e2-standard-2"}>E2</MenuItem>
              <MenuItem value={"N2"}>N2</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              width: "15%",
            }}
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" />
                &nbsp; Please wait...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </Box>
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleNotificationClose}
          severity={notification.severity}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

const services = [
  { label: "Compute Engine" },
  { label: "Deploy a Java Application with Compute Engine" },
  { label: "Estimate Cost" },
];

export default SearchComponent;
