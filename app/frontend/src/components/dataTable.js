import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function DataTable() {
  const [rows, setRows] = useState([]);
  const [isData, setisData] = useState(false);
  const fetchData = async () => {
    try {
      // Make a GET request to the API
      const response = await fetch("http://localhost:3500/getData", {
        method: "POST",
      });
      // Parse the JSON response
      const data = await response.json();
      // Update the rows state with the fetched data
      console.log(data);
      setRows(data);
      setisData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "instance_name", headerName: "Instance Name", width: 130 },
    { field: "owner", headerName: "Provider", width: 130 },
    { field: "region", headerName: "Region", width: 130 },
    { field: "zone", headerName: "Zone", width: 130 },
    { field: "config", headerName: "Configuration", width: 130 },
  ];
  return isData ? (
    <div
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Typography variant="body1" mb={1}>
        Existing Sandboxes
      </Typography>
      <DataGrid
        rows={rows.map((row, index) => ({ ...row, id: index+1 }))}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[2, 5, 10]}
      />
    </div>
  ) : (
    <>
      <Button onClick={fetchData}>Fetch Data</Button>
    </>
  );
}

export default DataTable;
