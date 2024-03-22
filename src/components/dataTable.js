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
  { id: 1, name: "Jon", age: 35, cost: 250 },
  { id: 2, name: "Cersei", age: 42, cost: 250 },
  { id: 3, name: "Jaime", age: 45, cost: 250 },
  { id: 4, name: "Arya", age: 16, cost: 250 },
  { id: 5, name: "Daenerys", age: null, cost: 250 },
  { id: 6, name: null, age: 150, cost: 250 },
  { id: 7, name: "Ferrara", age: 44, cost: 250 },
  { id: 8, name: "Rossini", age: 36, cost: 250 },
  { id: 9, name: "Harvey", age: 65, cost: 250 },
];

function DataTable() {
  return (
    <div
      style={{
        height: 400,
        width: "auto",
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
