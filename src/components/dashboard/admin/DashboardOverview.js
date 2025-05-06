import { motion } from 'framer-motion';
import {
  Grid,
  Card,
  Box,
  Typography,
  Avatar,
  LinearProgress,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FolderSpecial,
  Assignment,
  Groups,
  CheckCircle,
  Pending,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
// import NotificationsSummary from './NotificationsSummary';

const summaryCards = [
  {
    title: 'Total Projects',
    count: 24,
    icon: <FolderSpecial />,
    color: '#2196f3',
    trend: '+12%',
    trendUp: true,
    description: '5 new projects this month',
    progress: 80,
  },
  {
    title: 'Total Tasks',
    count: 156,
    icon: <Assignment />,
    color: '#ff9800',
    trend: '+8%',
    trendUp: true,
    description: '24 tasks added this week',
    progress: 65,
  },
  {
    title: 'Team Members',
    count: 32,
    icon: <Groups />,
    color: '#4caf50',
    trend: '+15%',
    trendUp: true,
    description: '4 new members joined',
    progress: 90,
  },
  {
    title: 'Completed Projects',
    count: 18,
    icon: <CheckCircle />,
    color: '#9c27b0',
    trend: '75%',
    trendUp: true,
    description: 'Project completion rate',
    progress: 75,
  },
  {
    title: 'Pending Tasks',
    count: 45,
    icon: <Pending />,
    color: '#f44336',
    trend: '-5%',
    trendUp: false,
    description: 'Tasks need attention',
    progress: 40,
  },
];

const DashboardOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="dashboard" sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: 600,
          color: '#1a237e',
          textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
          scrollMarginTop: { xs: '56px', sm: '64px' },
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
          px: { xs: 1, sm: 0 }
        }}
      >
        Welcome to Admin Dashboard
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        {/* First row - Summary Cards */}
        {summaryCards.slice(0, 4).map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                component={motion.div}
                whileHover={{
                  y: -5,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 },
                }}
                sx={{
                  p: { xs: 1.5, sm: 2, md: 3 },
                  height: '100%',
                  minHeight: { md: 180 },
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: { xs: 1, sm: 2 },
                  backgroundColor: '#ffffff',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(45deg, ${card.color} 0%, ${card.color}99 100%)`,
                  },
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  gap: { xs: 1, sm: 0 }
                }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        fontWeight: 700,
                        color: card.color,
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                      }}
                    >
                      {card.count}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: `${card.color}15`,
                      color: card.color,
                      width: { xs: 35, sm: 45, md: 56 },
                      height: { xs: 35, sm: 45, md: 56 },
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      flexWrap: 'wrap',
                      gap: { xs: 0.5, sm: 1 }
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: card.trendUp ? 'success.main' : 'error.main',
                        mr: 1,
                        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                      }}
                    >
                      {card.trendUp ? (
                        <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                      ) : (
                        <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                      )}
                      {card.trend}
                    </Typography>
                    <Tooltip title={card.description} arrow>
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                          flexGrow: 1,
                          textAlign: { xs: 'right', sm: 'left' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {card.description}
                      </Typography>
                    </Tooltip>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{
                      height: { xs: 3, sm: 4, md: 6 },
                      borderRadius: 5,
                      bgcolor: `${card.color}20`,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        bgcolor: card.color,
                      },
                    }}
                  />
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}

        {/* <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card
              component={motion.div}
              whileHover={{
                y: -5,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                transition: { duration: 0.2 },
              }}
              sx={{
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
                gap: { xs: 2, md: 4 },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: { xs: 1, sm: 2 },
                backgroundColor: '#ffffff',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(45deg, #f44336 0%, #ff9800 100%)',
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                flex: { md: '0 0 auto' }
              }}>
                <Avatar
                  sx={{
                    bgcolor: '#f4433615',
                    color: '#f44336',
                    width: { xs: 45, sm: 56, md: 64 },
                    height: { xs: 45, sm: 56, md: 64 },
                  }}
                >
                  <Pending sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }} />
                </Avatar>
                <Box>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      fontWeight: 600,
                      color: '#f44336',
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                    }}
                  >
                    45
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                    }}
                  >
                    Pending Tasks
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  gap: 1
                }}>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'error.main',
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                    -5%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    Tasks need attention
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={40}
                  sx={{
                    height: { xs: 4, sm: 6, md: 8 },
                    borderRadius: 5,
                    bgcolor: '#f4433620',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      bgcolor: '#f44336',
                    },
                  }}
                />
              </Box>
            </Card>
          </motion.div>
        </Grid> */}

        {/* <Grid item xs={12} md={4}>
          <NotificationsSummary />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default DashboardOverview;