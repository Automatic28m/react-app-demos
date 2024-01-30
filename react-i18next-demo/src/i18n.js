import { initReactI18next } from 'react-i18next'
import i18n from "i18next";
import translationTH from './asset/locals/th/translate.json'
import translationEN from './asset/locals/en/translate.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            th: {
                translation: translationTH
            },
            en: {
                translation: translationEN
            }
        },
        lng: 'th',
        interpolation: {
            escapeValue: false,
        }
    });