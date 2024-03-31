import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
const SearchComponent = ({ setIsTableVisible }) => {
  const [value, setValue] = React.useState();
  const [region, setRegion] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [config, setConfig] = React.useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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
  return (
    <Box sx={{
        height:"100%",
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"start",
        marginTop:12,
        gap:4,
    }}>
      <Autocomplete
        disablePortal
        value={value}
        onChange={handleAutocompleteChange}
        id="services-search-box"
        options={services}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search (/) for resources" />}
      />
      {showAdditionalFields && (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            width:"100%",
            gap:2,
        }}>
          <TextField id="name" label="Instance Name" variant="outlined" fullWidth/>
          <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap:2
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
            >
              <MenuItem value={10}>us-central1 (lowa)</MenuItem>
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
            >
              <MenuItem value={10}>us-central1-a</MenuItem>
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
              value={config}
              label="Machine Configuration"
              onChange={handleConfigChange}
            >
              <MenuItem value={10}>E2</MenuItem>
              <MenuItem value={10}>N2</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
                width:"15%"
            }}
            variant="contained"
            onClick={() => {
              setIsTableVisible(true);
            }}
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
