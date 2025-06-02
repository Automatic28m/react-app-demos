import { initReactI18next } from 'react-i18next'
import i18n from "i18next";
import translationTH from './asset/locals/th/translate.json'
import translationEN from './asset/locals/en/translate.json'
import translationES from './asset/locals/es/translate.json'
// import translations from './asset/locals/translation.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: ['en','es','th'], //Fallback
        lng: 'th', // Start language
        // keySeparator: false, // Disable key separator to handle nested structure
        // returnObjects: false,
        debug: true,
        // returnEmptyString: false,
        resources: {
            th: {
                translation: translationTH
            },
            en: {
                translation: translationEN
            },
            es: {
                translation: translationES
            },

        },
        // resources: {
        //     en: {
        //         translation: translations.en,
        //     },
        //     th: {
        //         translation: translations.th,
        //     },
        //     es: {
        //         translation: translations.es,
        //     },
        // },
        // resources,
        interpolation: {
            escapeValue: false,
        }
    });