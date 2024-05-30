import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Button from '@material-ui/core/Button';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
import { prices } from './fixedPrices';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  filterSection: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(2),
  },
  filterTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: '#333',
  },
  productSection: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  productTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: '#333',
  },
  btn: {
    background: 'linear-gradient(45deg, #4285f4 30%, #34a853 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(66, 133, 244, .3)',
  },
  loadMoreContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const classes = useStyles();

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className={classes.loadMoreContainer}>
          <Button onClick={loadMore} variant='contained' className={classes.btn}>
            Load more
          </Button>
        </div>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title='Shop'
      description='Search and find products'
      className='container-fluid'
    >
      <Search />
      <div className='row'>
        <div className='col-md-3'>
          <div className={classes.filterSection}>
            <h4 className={classes.filterTitle}>Filter by categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, 'category')}
              />
            </ul>

            <h4 className={classes.filterTitle}>Filter by price range</h4>
            <div>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, 'price')}
              />
            </div>
          </div>
        </div>

        <div className='col-md-9'>
          <div className={classes.productSection}>
            <h2 className={classes.productTitle}>Products</h2>
            <div className='row'>
              {filteredResults.map((product, i) => (
                <div key={i} className='col-xl-4 col-lg-6 col-md-12 col-sm-12'>
                  <Card product={product} />
                </div>
              ))}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
        </div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Shop;
