import reactlogo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from './redux/slice/langSlice';
import { useEffect } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  const lang = useSelector(({ Language }) => Language.lang);
  const dispatch = useDispatch();

  // console.log('Current Language:', i18n.language);
  // console.log('Translations:', i18n.getResourceBundle(i18n.language, 'translation'));

  useEffect(() => {
    i18n.changeLanguage(lang);
    // console.log(i18n.language);
    // console.log('Fallback Order:', i18n.options.fallbackLng);
    // console.log(t('greeting'));
  }, [i18n, lang])

  // const _t = (text) => {
  //   const translation = t(text, { returnObjects: true });
  //   return typeof translation === 'string' ? translation : translation[i18n.language];
  // }


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={reactlogo} className="App-logo" alt="logo" /> */}
        {/* <h1>{t('greeting')}</h1>
        <h1>{t('thanksGiving')}</h1>  */}
        <h1>
          {t('home.greeting')} 
        </h1>
        <p>
          {t('home.title')}
        </p>
        <p style={{ color: 'lightblue' }}>
          {t('home.OnlyInEng')}
        </p>
        {/* Default value */}
        <p style={{ color: 'red' }}>
          {t('NoKeyFounded','Default value to show')}
        </p>
        <label>
          {t('selection.changeLanguage')}
        </label>
        <select name="" id=""
          onChange={(e) => dispatch(setLanguage(e.target.value))}
          style={{ padding: 10, background: 'transparent', color: 'white' }}>
          <option value="th">Thai</option>
          <option value="en">English</option>
          <option value="es">Espanol</option>
        </select>
      </header>
    </div>
  );
}

export default App;
