import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Alert, Box } from "@mui/material";
const SearchComponent = ({ setIsTableVisible, selectedVal }) => {
  const [value, setValue] = useState();
  const [instanceName, setInstanceName] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [config, setConfig] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleInstanceNameChange = (event) => {
    setInstanceName(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };
  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };
  const handleConfigChange = (event) => {
    setConfig(event.target.value);
  };
  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setShowAdditionalFields(true);
  };

  const handleSubmit = async () => {
    var dataVal = {
      owner: selectedVal,
      instance_name: instanceName,
      region: region,
      zone: zone,
      config: config,
    };

    try {
      console.log("Hi, Hello");
      const response = await fetch("http://localhost:3500/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataVal),
      });
      console.log("Hi, Hello 2");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

      // Show the table or perform other actions
      setIsTableVisible(true);
    } catch (error) {
      Alert("error");
      console.error("Error:", error);
    }
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
            id="instance_name"
            onChange={handleInstanceNameChange}
            label="Instance Name"
            variant="outlined"
            fullWidth
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
              <InputLabel id="region-select">Region</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={region}
                label="Region"
                onChange={handleRegionChange}
              >
                <MenuItem value={"us-central1 (lowa)"}>
                  us-central1 (lowa)
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="zone-select">Zone</InputLabel>
              <Select
                labelId="zone-select-label"
                id="zone-select"
                value={zone}
                label="Zone"
                onChange={handleZoneChange}
              >
                <MenuItem value={"us-central1-a"}>us-central1-a</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="config-select">Machine Configuration</InputLabel>
            <Select
              labelId="config-select"
              id="config-select"
              value={config}
              label="Machine Configuration"
              onChange={handleConfigChange}
            >
              <MenuItem value={"E2"}>E2</MenuItem>
              <MenuItem value={"N2"}>N2</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              width: "15%",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      )}
    </Box>
  );
};
const services = [
  { label: "Compute Engine" },
  { label: "Deploy a Java Application with Compute Engine" },
  { label: "Estimate Cost" },
];
export default SearchComponent;
