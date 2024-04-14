import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "owner", headerName: "Owner", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "cost",
    headerName: "Cost",
    description: "This column has a value getter and is not sortable.",
    /* sortable: false, */
    width: 160,
    /* valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`, */
  },
];

const rows = [
  { id: 1,name: "GCS" ,owner: "Jon", age: 5, cost: 750 },
  { id: 2,name: "GCS" ,owner: "Cersei", age: 2, cost: 250 },
  { id: 3,name: "GCS" ,owner: "Jaime", age: 4, cost: 250 },
  { id: 4,name: "GCS" ,owner: "Arya", age: 6, cost: 450 },
  { id: 5,name: "GCS" ,owner: "Daenerys", age: null, cost: 150 },
  { id: 6,name: "GCS" ,owner: null, age: 1, cost: 50 },
  { id: 7,name: "GCS" ,owner: "Ferrara", age: 4, cost: 550 },
  { id: 8,name: "GCS" ,owner: "Rossini", age: 6, cost: 650 },
  { id: 9,name: "GCS" ,owner: "Harvey", age: 3, cost: 350 },
];

function DataTable() {
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection:"column",
        alignItems: "start",
      }}
    >
      <Typography variant="body1" mb={1}>
        Existing Sandboxes
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[2, 5, 10]}
        /* checkboxSelection */
      />
    </div>
  );
}

export default DataTable;
