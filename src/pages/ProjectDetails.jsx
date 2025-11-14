import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  Button,
  Paper,
  CircularProgress,
  Box, // ✅ import Box for centering
} from "@mui/material";

const ProjectDetails = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project after projects are loaded
  const project = projects.find((p) => p.id === parseInt(id));

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project) {
      setStatus(project.status);
      setLoading(false);
    }
  }, [project]);

  // Show loading or "not found" if project is missing
  if (loading)
    return ( "Not found",<CircularProgress />);


  if (!project)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Typography variant="h6">Project not found</Typography>
      </Box>
    );

  const handleSave = () => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, status } : p
    );
    setProjects(updatedProjects);
    alert("Project status updated!");
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, margin: "40px auto", p: 3, borderRadius: 3 }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {project.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Owner: {project.owner}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {project.description}
          </Typography>

          <Typography>Status:</Typography>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};


export default ProjectDetails;

