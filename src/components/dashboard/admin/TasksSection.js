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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  FilterList,
  FlagCircle,
  AccessTime,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ActivityTimeline from './ActivityTimeline';
import TaskStatusChart from './TaskStatusChart';

const recentTasks = [
  {
    id: 1,
    title: 'Update User Interface',
    assignedTo: 'Vanraj',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2025-05-10',
    project: 'Website Redesign'
  },
  {
    id: 2,
    title: 'Database Optimization',
    assignedTo: 'Parth',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2025-05-15',
    project: 'Database Migration'
  },
  {
    id: 3,
    title: 'Security Testing',
    assignedTo: 'Gaurav',
    status: 'Done',
    priority: 'High',
    dueDate: '2025-04-30',
    project: 'Security Audit'
  },
  {
    id: 4,
    title: 'Mobile App Testing',
    assignedTo: 'Pruthvi',
    status: 'In Progress',
    priority: 'Low',
    dueDate: '2025-05-05',
    project: 'Mobile App Development'
  },
  {
    id: 5,
    title: 'Content Migration',
    assignedTo: 'Prabhat',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2025-05-20',
    project: 'Website Redesign'
  }
];

const TasksSection = ({ projects }) => {
  const [taskFilter, setTaskFilter] = useState({
    priority: 'all',
    status: 'all'
  });
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#f44336';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#757575';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return '#4caf50';
      case 'In Progress': return '#2196f3';
      case 'To Do': return '#757575';
      default: return '#757575';
    }
  };

  const getFilteredTasks = () => {
    return recentTasks.filter(task => {
      const matchesPriority = taskFilter.priority === 'all' || task.priority === taskFilter.priority;
      const matchesStatus = taskFilter.status === 'all' || task.status === taskFilter.status;
      return matchesPriority && matchesStatus;
    });
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleDeleteTask = (task) => {
    setDeleteTask(task);
  };

  const handleSaveTask = () => {
    // Implement save task logic here
    setEditTask(null);
    // Show success message
  };

  const handleConfirmDeleteTask = () => {
    // Implement delete task logic here
    setDeleteTask(null);
    // Show success message
  };

  return (
    <Box id="tasks" sx={{ mt: { xs: 3, sm: 4, md: 6 }, scrollMarginTop: { xs: '56px', sm: '64px' } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        mb: { xs: 2, sm: 3 }
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 600, 
          color: '#1a237e',
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          Recent Tasks
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
            <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Priority</InputLabel>
            <Select
              value={taskFilter.priority}
              label="Priority"
              onChange={(e) => setTaskFilter({ ...taskFilter, priority: e.target.value })}
              startAdornment={
                <InputAdornment position="start">
                  <FlagCircle sx={{ fontSize: { xs: 18, sm: 20 } }} />
                </InputAdornment>
              }
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
            <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Status</InputLabel>
            <Select
              value={taskFilter.status}
              label="Status"
              onChange={(e) => setTaskFilter({ ...taskFilter, status: e.target.value })}
              startAdornment={
                <InputAdornment position="start">
                  <FilterList sx={{ fontSize: { xs: 18, sm: 20 } }} />
                </InputAdornment>
              }
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ 
        overflow: 'auto',
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 }
      }}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
            borderRadius: { xs: 1, sm: 2 },
            overflow: 'hidden',
            minWidth: { xs: '600px', md: '100%' }
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f7fb' }}>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 }
                }}>Task Title</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 },
                  display: { xs: 'none', sm: 'table-cell' }
                }}>Assigned To</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 },
                  display: { xs: 'none', md: 'table-cell' }
                }}>Project</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 }
                }}>Status</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 }
                }}>Priority</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 },
                  display: { xs: 'none', sm: 'table-cell' }
                }}>Due Date</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 2 }
                }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredTasks().map((task) => (
                <TableRow
                  key={task.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {task.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', sm: 'table-cell' }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          width: { xs: 24, sm: 30 },
                          height: { xs: 24, sm: 30 },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          bgcolor: theme.palette.primary.main,
                        }}
                      >
                        {task.assignedTo.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        {task.assignedTo}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    display: { xs: 'none', md: 'table-cell' }
                  }}>
                    <Typography variant="body2" color="textSecondary">
                      {task.project}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(task.status)}15`,
                        color: getStatusColor(task.status),
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FlagCircle
                        sx={{
                          fontSize: { xs: 16, sm: 20 },
                          color: getPriorityColor(task.priority),
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: getPriorityColor(task.priority),
                          fontWeight: 500,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' }
                        }}
                      >
                        {task.priority}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', sm: 'table-cell' }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTime sx={{ 
                        fontSize: { xs: 16, sm: 20 }, 
                        color: 'text.secondary' 
                      }} />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                        {format(new Date(task.dueDate), 'MMM dd')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/admin/tasks/${task.id}`)}
                          sx={{ color: theme.palette.info.main }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Task">
                        <IconButton
                          size="small"
                          onClick={() => handleEditTask(task)}
                          sx={{ color: theme.palette.warning.main }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteTask(task)}
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
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid 
            item 
            xs={12}     /* On mobile (extra small), take full width */
            md={6}      /* On desktop (medium), take half width */
          >
            <TaskStatusChart tasks={getFilteredTasks()} />
          </Grid>
          <Grid 
            item 
            xs={12}     /* On mobile (extra small), take full width */
            md={6}      /* On desktop (medium), take half width */
            id="activity" 
            sx={{ scrollMarginTop: '64px' }}
          >
            <ActivityTimeline />
          </Grid>
        </Grid>
      </Box>

      {/* Edit Task Dialog */}
      <Dialog 
        open={!!editTask} 
        onClose={() => setEditTask(null)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              value={editTask?.title || ''}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              sx={{ '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
            />
            <TextField
              fullWidth
              label="Assigned To"
              value={editTask?.assignedTo || ''}
              onChange={(e) => setEditTask({ ...editTask, assignedTo: e.target.value })}
              sx={{ '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Status</InputLabel>
              <Select
                value={editTask?.status || ''}
                label="Status"
                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Priority</InputLabel>
              <Select
                value={editTask?.priority || ''}
                label="Priority"
                onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={editTask?.dueDate || null}
                onChange={(date) => setEditTask({ ...editTask, dueDate: date })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }
                  }
                }}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Project</InputLabel>
              <Select
                value={editTask?.project || ''}
                label="Project"
                onChange={(e) => setEditTask({ ...editTask, project: e.target.value })}
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                {projects?.map((project) => (
                  <MenuItem key={project.id} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button 
            onClick={() => setEditTask(null)}
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask} 
            variant="contained"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog 
        open={!!deleteTask} 
        onClose={() => setDeleteTask(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Delete Task
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Are you sure you want to delete task "{deleteTask?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button 
            onClick={() => setDeleteTask(null)}
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDeleteTask} 
            color="error" 
            variant="contained"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TasksSection;