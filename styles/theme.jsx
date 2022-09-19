import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

const theme = createTheme({
  palette: {
    background: {
      // default: '#f4f5fd',
      // default: '#f8f9fa',
      // default: '#ced4da',
      // default: '#fff',
      default: '#f8f9fb',
    },
  },
});

// const theme = createTheme({
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           // backgroundColor: '#FAACA8',
//           background: `linear-gradient(90deg, hsla(177, 87%, 79%, 1) 0%, hsla(235, 89%, 70%, 1) 100%)`,
//         },
//       },
//     },
//   },
// });

export default theme;
