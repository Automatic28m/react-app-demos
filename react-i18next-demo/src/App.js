import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from './redux/slice/langSlice';
import { useEffect } from 'react';
import i18n from 'i18next';

function App() {
  const { t } = useTranslation();

  const lang = useSelector(({ Language }) => Language.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          {t('title')}
        </h2>
        <b style={{ marginBottom: 20 }}>
          {t('translateMessage')}
        </b>
        <select name="" id=""
          onChange={(e) => dispatch(setLanguage(e.target.value))}
          style={{ padding: 10, background: 'transparent', color: 'white' }}>
          <option value="th">TH</option>
          <option value="en">EN</option>
        </select>
      </header>
    </div>
  );
}

export default App;
