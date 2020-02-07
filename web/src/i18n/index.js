import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ptBr from './pt-br';
import es from './es';

Vue.use(VueI18n);

const messages = {
    'pt': ptBr,
    'pt-br': ptBr,
    es
};

const ptBrDate = {
    short: {
        year: 'numeric', month: 'numeric', day: 'numeric'
    },
    long: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
};

const dateTimeFormats = {
    'pt': ptBrDate,
    'pt-br': ptBrDate,
    'es': {
        short: {
            year: 'numeric', month: 'numeric', day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    }
};

const i18n = new VueI18n({
    locale: navigator.language.substring(0, 2),
    fallbackLocale: 'pt-br',
    dateTimeFormats,
    messages
});

export default i18n;
