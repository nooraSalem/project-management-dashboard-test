import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ onLogout, projects, setProjects }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");

  // New Project Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    owner: "",
    status: "",
    description: "",
  });

  // Fetch projects once when the app starts
  useEffect(() => {
    if (projects.length > 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
        const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");

        const posts = await postsRes.json();
        const users = await usersRes.json();

        const formatted = posts.slice(0, 20).map((post) => {
          const owner = users.find((u) => u.id === post.userId);

          return {
            id: post.id,
            title: post.title,
            description: post.body,
            owner: owner ? owner.name : "Unknown",
            status: ["active", "pending", "completed"][
              Math.floor(Math.random() * 3)
            ],
            createdAt: new Date().toLocaleDateString(),
          };
        });

        setProjects(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [projects, setProjects]);

  // FILTER by Search Input
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q);
  });

  // Add New Project
  const handleCreateProject = () => {
    if (
      !newProject.title ||
      !newProject.owner ||
      !newProject.status ||
      !newProject.description
    ) {
      alert("Please fill all fields");
      return;
    }

    const created = {
      id: projects.length + 1,
      ...newProject,
      createdAt: new Date().toLocaleDateString(),
    };

    setProjects([created, ...projects]);
    setOpenDialog(false);

    // Clear form
    setNewProject({
      title: "",
      owner: "",
      status: "",
      description: "",
    });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 150 },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Project Dashboard
      </Typography>

      {/* Search */}
      <TextField
        label="Search by Title or Owner"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Toggle View */}
      <Button
        variant="outlined"
        startIcon={view === "table" ? <ViewModuleIcon /> : <TableViewIcon />}
        sx={{ mb: 3 }}
        onClick={() => setView(view === "table" ? "card" : "table")}
      >
        {view === "table" ? "Switch to Card View" : "Switch to Table View"}
      </Button>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredProjects}
            columns={columns}
            pageSize={10}
            onRowClick={(params) => navigate(`/project/${params.row.id}`)}
            sx={{ cursor: "pointer", background: "white", borderRadius: 2 }}
          />
        </div>
      )}

      {/* CARD VIEW */}
      {view === "card" && (
        <Grid container spacing={2}>
          {filteredProjects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Paper
                elevation={3}
                sx={{ p: 2, cursor: "pointer" }}
                onClick={() => navigate(`/project/${p.id}`)}
              >
                <Typography variant="h6">{p.title}</Typography>
                <Typography color="textSecondary">{p.owner}</Typography>
                <Typography>Status: {p.status}</Typography>
                <Typography sx={{ mt: 1 }}>{p.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* NEW PROJECT BUTTON */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>

      {/* NEW PROJECT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mt: 2 }}
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />

          <TextField
            label="Owner"
            fullWidth
            sx={{ mt: 2 }}
            value={newProject.owner}
            onChange={(e) =>
              setNewProject({ ...newProject, owner: e.target.value })
            }
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newProject.status}
              label="Status"
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProject}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
