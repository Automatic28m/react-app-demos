import { NewNavbar } from './components/NewNavbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductGrid from './components/ProductGrid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectView } from './selectors/viewSelectors';
import { selectCartItems } from './selectors/cartSelectors';
import Footer from './components/Footer';

function App() {
  const view = useSelector(selectView);
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const changeView = (view) => {
    return {
      type: 'SET_VIEW',
      payload: view
    };
  };

  const updateTotalPrice = (totalPrice) => {
    return {
      type: 'UPDATE_TOTAL_PRICE',
      totalPrice
    }
  }

  const url = `https://fakestoreapi.com/products`;
  const fetchData = () => {
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

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
  });

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
      dispatch(updateTotalPrice(totalPrice));
    };

    calculateTotal();
  }, [cartItems, dispatch])

  const filteredData = data.filter((item) => {
    // Check if the item matches the selected category and the search query
    return (
      (selectedCate === '' || item.category === selectedCate) &&
      (searchKeyword === '' ||
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  return (
    <div className='container-fluid bg-gray-200'>
      <NewNavbar />
      <div className='container py-10 mx-auto max-w-5xl px-6'>
        <div className='search mb-3'>
          <input
            className='input input-bordered input-primary w-full max-w-xl'
            type="text"
            name="search"
            placeholder='Search by product title...'
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
          />
        </div>
        <div className='cate-selection mb-3'>
          <select className='select select-primary w-full max-w-xl' onChange={(e) => setSelectedCate(e.target.value)} value={selectedCate}>
            <option value="">Select category...</option>
            {cate.map((category, index) => {
              return (
                <option key={index} value={category}>{category}</option>
              )
            })}
          </select>
        </div>
        <div className='display-selection flex flex-col align-middle gap-3'>
          <span className=''>Display as</span>
          <div className='flex flex-row gap-3'>
            <button className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => dispatch(changeView('grid'))}>
              Grid
            </button>
            <button className={`btn ${view === 'list' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => dispatch(changeView('list'))}>
              List
            </button>
          </div>
        </div>
        <div className='my-3'>
          <p>{filteredData.length} Products</p>
        </div>
        {view === 'grid' ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
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
      <Footer />
      {/* <ShoppingCart/> */}
    </div>
  );
}

export default App;
