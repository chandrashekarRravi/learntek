import { createTheme } from '@mui/material/styles';

// Map CSS variables (HSL values) used in index.css to MUI palette.
// The CSS vars are defined as HSL triples like "210 100% 50%".
const hslVar = (name: string) => `hsl(var(${name}))`;

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: hslVar('--primary'),
      contrastText: hslVar('--primary-foreground'),
    },
    secondary: {
      main: hslVar('--secondary'),
      contrastText: hslVar('--secondary-foreground'),
    },
    background: {
      default: hslVar('--background'),
      paper: hslVar('--card'),
    },
    text: {
      primary: hslVar('--foreground'),
      secondary: hslVar('--muted-foreground'),
    },
    error: {
      main: hslVar('--destructive'),
      contrastText: hslVar('--destructive-foreground'),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default muiTheme;
