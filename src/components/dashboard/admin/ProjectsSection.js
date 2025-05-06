import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const latestProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    progress: 75,
    startDate: '2025-04-01',
    endDate: '2025-05-15',
    status: 'Active',
    description: 'Complete overhaul of company website',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    progress: 90,
    startDate: '2025-03-15',
    endDate: '2025-04-30',
    status: 'Completed',
    description: 'New mobile app for customers',
  },
  {
    id: 3,
    name: 'Database Migration',
    progress: 45,
    startDate: '2025-04-10',
    endDate: '2025-05-20',
    status: 'Active',
    description: 'Migrate to new cloud database',
  },
  {
    id: 4,
    name: 'Security Audit',
    progress: 60,
    startDate: '2025-04-05',
    endDate: '2025-05-05',
    status: 'Active',
    description: 'Annual security assessment',
  },
  {
    id: 5,
    name: 'UI/UX Improvements',
    progress: 100,
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    status: 'Completed',
    description: 'User interface enhancements',
  },
];

const ProjectsSection = () => {
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });
  
  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditProject = (project) => {
    setEditProject(project);
  };

  const handleDeleteProject = (project) => {
    setDeleteProject(project);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    setDeleteProject(null);
    // Show success message
  };

  const handleSaveEdit = () => {
    // Implement save logic here
    setEditProject(null);
    // Show success message
  };

  const handleNewProject = () => {
    setOpenNewProject(true);
  };

  const handleSaveNewProject = () => {
    // Implement save new project logic here
    setOpenNewProject(false);
    setNewProject({
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
    });
    // Show success message
  };

  return (
    <Box id="projects" sx={{ mt: 6, scrollMarginTop: '64px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a237e' }}>
          Latest Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewProject}
          sx={{
            background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
            boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
          }}
        >
          New Project
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f7fb' }}>
              <TableCell sx={{ fontWeight: 600 }}>Project Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestProjects.map((project) => (
              <TableRow
                key={project.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        width: 100,
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          backgroundColor: 
                            project.progress === 100 
                              ? '#4caf50' 
                              : project.progress > 50 
                              ? '#2196f3' 
                              : '#ff9800',
                        },
                      }}
                    />
                    <Typography variant="body2">
                      {project.progress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{format(new Date(project.startDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(new Date(project.endDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Chip
                    label={project.status}
                    color={project.status === 'Active' ? 'primary' : 'success'}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/projects/${project.id}`)}
                        sx={{ color: theme.palette.info.main }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Project">
                      <IconButton
                        size="small"
                        onClick={() => handleEditProject(project)}
                        sx={{ color: theme.palette.warning.main }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Project">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProject(project)}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Project Dialog */}
      <Dialog open={!!editProject} onClose={() => setEditProject(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Project Name"
              value={editProject?.name || ''}
              onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={editProject?.startDate || null}
                onChange={(date) => setEditProject({ ...editProject, startDate: date })}
              />
              <DatePicker
                label="End Date"
                value={editProject?.endDate || null}
                onChange={(date) => setEditProject({ ...editProject, endDate: date })}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={editProject?.description || ''}
              onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProject(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteProject} onClose={() => setDeleteProject(null)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteProject?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteProject(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Project Dialog */}
      <Dialog open={openNewProject} onClose={() => setOpenNewProject(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={newProject.startDate}
                onChange={(date) => setNewProject({ ...newProject, startDate: date })}
              />
              <DatePicker
                label="End Date"
                value={newProject.endDate}
                onChange={(date) => setNewProject({ ...newProject, endDate: date })}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewProject(false)}>Cancel</Button>
          <Button onClick={handleSaveNewProject} variant="contained">Create Project</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsSection;