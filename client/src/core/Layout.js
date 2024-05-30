import React from 'react';
import Menu from './Menu';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography } from '@material-ui/core';
import '../styles.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c387e',
    },
    secondary: {
      main: '#ff9900',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const useStyles = makeStyles((theme) => ({
  jumbotron: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  description: {
    color: theme.palette.text.secondary,
  },
}));

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Container>
        <Paper elevation={3} className={classes.jumbotron}>
          <Typography variant="h2" component="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="h6" component="p" className={classes.description}>
            {description}
          </Typography>
        </Paper>
        <div className={className}>{children}</div>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
