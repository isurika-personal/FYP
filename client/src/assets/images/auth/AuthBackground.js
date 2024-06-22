// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <svg width="100%" height="calc(100vh - 175px)" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 0L0 400H400L200 0Z" fill={theme.palette.primary.light} />
        <path d="M0 0L200 400L400 0H0Z" fill={theme.palette.error.light} />
      </svg>
    </Box>
  );
};

export default AuthBackground;
