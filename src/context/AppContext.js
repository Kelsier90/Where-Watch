import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBus from "../domain/AppBus";

export const GlobalContext = React.createContext({});

AppContext.propTypes = {
    children: PropTypes.any.isRequired
};

function AppContext(props) {
    const [locale, setLocale] = useState(AppBus.getLocale());
    const setContextLocale = (locale) => {
        AppBus.setLocale(locale);
        setLocale(locale);
    };

    return (
        <GlobalContext.Provider value={{locale, setLocale: setContextLocale}}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default AppContext;