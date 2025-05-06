import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Assignment,
  Comment,
  CheckCircle,
  Pending,
  Warning,
  Edit,
  Delete,
} from '@mui/icons-material';

const Tasks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update user documentation',
      description: 'Update the user documentation with new features and improvements',
      status: 'completed',
      priority: 'high',
      deadline: '2024-05-01',
      project: 'Website Redesign',
      comments: [
        { id: 1, text: 'Started working on the documentation', date: '2024-04-25' },
        { id: 2, text: 'Completed the first draft', date: '2024-04-28' },
      ],
    },
    {
      id: 2,
      title: 'Implement new feature',
      description: 'Implement the new user authentication feature',
      status: 'pending',
      priority: 'medium',
      deadline: '2024-05-05',
      project: 'Mobile App',
      comments: [
        { id: 1, text: 'Started implementation', date: '2024-04-26' },
      ],
    },
    {
      id: 3,
      title: 'Bug fixes for login page',
      description: 'Fix the reported bugs in the login page',
      status: 'overdue',
      priority: 'high',
      deadline: '2024-04-28',
      project: 'Website Redesign',
      comments: [],
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedTask) {
      const comment = {
        id: Date.now(),
        text: newComment,
        date: new Date().toISOString().split('T')[0],
      };
      setTasks(tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, comments: [...task.comments, comment] }
          : task
      ));
      setNewComment('');
      setCommentDialogOpen(false);
    }
  };

  const TaskItem = ({ task }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={2}
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {task.title}
              </Typography>
            }
            secondary={`Project: ${task.project} • Due: ${task.deadline}`}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={task.status}
              color={getStatusColor(task.status)}
              size="small"
            />
            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              size="small"
            />
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSelectedTask(task);
                setCommentDialogOpen(true);
              }}
              startIcon={<Comment />}
            >
              Comments ({task.comments.length})
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleStatusChange(task.id, 'completed')}
              startIcon={<CheckCircle />}
            >
              Mark Complete
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" color="primary">
              <Edit />
            </IconButton>
            <IconButton size="small" color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          My Tasks
        </Typography>

        <List>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>

        <Dialog
          open={commentDialogOpen}
          onClose={() => setCommentDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Comments - {selectedTask?.title}
          </DialogTitle>
          <DialogContent>
            <List>
              {selectedTask?.comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemText
                    primary={comment.text}
                    secondary={comment.date}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleAddComment}
              variant="contained"
              color="primary"
            >
              Add Comment
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default Tasks; 