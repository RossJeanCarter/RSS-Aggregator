import i18next from 'i18next';

const i18nextInstance = i18next.createInstance();

i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
       ru: {
        translation: //  import ru 
        }, 
       en: {
        translation: // import en
       },
    }
})

const setLocale = (locale) => {
    i18nextInstance.changeLanguage(locale)
}

setLocale('ru');

export default i18nextInstance;
