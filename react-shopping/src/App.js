import { ProductFilter } from './components/ProductFilter';
import { NewNavbar } from './components/NewNavbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductGrid from './components/ProductGrid';
import Navbar from './components/Navbar';
import ShoppingCart from './ShoppingCart';

function App() {
  const [page, setPage] = useState('Home');
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [display, setDisplay] = useState('list');
  const url = `https://fakestoreapi.com/products`;

  useEffect(() => {
    // Fetch categories
    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCate(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Fetch initial product data
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCate(event.target.value);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  }

  const handleDisplayAsGrid = () => {
    setDisplay('grid');
  };

  const handleDisplayAsList = () => {
    setDisplay('list');
  };

  const filteredData = data.filter((item) => {
    // Check if the item matches the selected category and the search query
    return (
      (selectedCate === '' || item.category === selectedCate) &&
      (searchKeyword === '' ||
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  return (
    <div className='container-fluid'>
      {/* <Navbar page={page} /> */}
      <NewNavbar page={page}/>
      <div className='container my-5 mx-auto'>
        <div className='search mb-3'>
          <input
            className='input input-bordered input-primary w-full max-w-xl'
            type="text"
            name="search"
            placeholder='Search by product title...'
            onChange={handleSearch}
            value={searchKeyword}
          />
        </div>
        <div className='cate-selection mb-3'>
          <select className='select select-primary w-full max-w-xl' onChange={handleCategoryChange} value={selectedCate}>
            <option value="">Select category...</option>
            {cate.map((category, index) => {
              return (
                <option key={index} value={category}>{category}</option>
              )
            })}
          </select>
        </div>
        <div className='display-selection flex align-middle gap-3'>
          <span className=''>Display as</span>
          <button className={`btn ${display === 'grid' ? 'btn-primary' : 'btn-ghost'}`} onClick={handleDisplayAsGrid}>
            Grid
          </button>
          <button className={`btn ${display === 'list' ? 'btn-primary' : 'btn-ghost'}`} onClick={handleDisplayAsList}>
            List
          </button>
        </div>
        <div className='my-3'>
          <p>{filteredData.length} Products</p>
        </div>
        {display === 'grid' ? (
          <div className='grid grid-cols-4 gap-3'>
            {filteredData.map((dataObj, index) => (
              <ProductGrid key={index} dataObj={dataObj} index={index} />
            ))}
          </div>
        ) : (
          <div>
            {filteredData.map((dataObj, index) => (
              <ProductList key={index} dataObj={dataObj} index={index} />
            ))}
          </div>
        )}
      </div>
      {/* <ShoppingCart/> */}
    </div>
  );
}

export default App;
