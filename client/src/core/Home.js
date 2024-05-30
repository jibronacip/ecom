import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import 'fontsource-roboto';
import Copyright from './Copyright';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#f0f0f0',
  },
  section: {
    margin: theme.spacing(4, 0),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff', // Primary color
  },
  productGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  cardContent: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    color: '#007bff', // Primary color
  },
  cardPrice: {
    color: '#ff5722', // Accent color
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#333',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home'
      description='Shopping Store'
      className={classes.root}
    >
      <Container maxWidth="lg">
        <Search />
        <div className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            New Arrivals
          </Typography>
          <Grid container spacing={4} className={classes.productGrid}>
            {productsByArrival.map((product, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} className={classes.productCard}>
                <div className={classes.cardContent}>
                  <Card product={product} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography variant="h4" className={classes.title}>
            Best Sellers
          </Typography>
          <Grid container spacing={4} className={classes.productGrid}>
            {productsBySell.map((product, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} className={classes.productCard}>
                <div className={classes.cardContent}>
                  <Card product={product} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        <Copyright />
      </Container>
    </Layout>
  );
};

export default Home;
