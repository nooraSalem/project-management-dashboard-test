// ProjectTable.jsx
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const ProjectTable = ({ projects, view = "table", onRowClick }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 150 },
  ];

  if (view === "table") {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={5}
          onRowClick={(params) => onRowClick(params.id)}
        />
      </div>
    );
  }

  // Card View
  return (
    <Grid container spacing={2}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => onRowClick(project.id)}
          >
            <CardContent>
              <Typography variant="h6">{project.title}</Typography>
              <Typography color="textSecondary">{project.owner}</Typography>
              <Typography>Status: {project.status}</Typography>
              <Typography>Created At: {project.createdAt}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectTable;
