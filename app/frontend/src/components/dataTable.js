import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Perform fetch request to your API endpoint
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getdata`
      ); // Adjust URL as per your API endpoint
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // console.log(data)
      // Map data to match table structure
      const mappedData = data.map((item, index) => {
        const creationTime = new Date(item.createdAt);
        const currentTime = new Date();

        // Convert creationTime and currentTime to UTC
        const creationTimeUTC = new Date(
          creationTime.getTime() + creationTime.getTimezoneOffset() * 60000
        );
        const currentTimeUTC = new Date(
          currentTime.getTime() + currentTime.getTimezoneOffset() * 60000
        );

        // Calculate age in minutes using UTC timestamps
        const ageInMinutes = Math.floor(
          (currentTimeUTC - creationTimeUTC) / 60000
        );

        // Calculate cost based on age
        const cost = (ageInMinutes * 0.05).toFixed(2); // $0.05 per minute

        return {
          id: index + 1,
          _id: item._id,
          name: item.instance_name,
          owner: item.owner,
          age: ageInMinutes,
          cost: cost,
          zone: item.zone,
          machine_type:item.machine_type
        };
      });

      setRows(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (_id) => {
    console.log(rows)
    const row = rows.find(row => row._id === _id);
    const dataVal = {
      name: row.name,
      machine_type: row.machine_type,
      zone: row.zone,
      owner: row.owner,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tfdestroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataVal),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

    } catch (error) {
      window.alert("error");
      console.error("Error:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "owner", headerName: "Owner", width: 130 },
    {
      field: "age",
      headerName: "Age (minutes)",
      type: "number",
      width: 130,
    },
    {
      field: "cost",
      headerName: "Cost ($)",
      description: "This column has a value getter and is not sortable.",
      width: 130,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDelete(
              rows[params.id - 1]["_id"],
              rows[params.id - 1]["name"],
              rows[params.id - 1]["machine_type"],
              rows[params.id - 1]["zone"],
              rows[params.id - 1]["owner"]
            );
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
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
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default DataTable;
