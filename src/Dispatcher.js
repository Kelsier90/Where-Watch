import React, {useContext} from 'react';
import {GlobalContext} from "./context/AppContext";
import LocaleSelectionPage from "./pages/LocaleSelectionPage";
import ItemSearchPage from "./pages/ItemSearchPage";

function Dispatcher(props) {
    const {locale} = useContext(GlobalContext);

    if(locale)
        return <ItemSearchPage/>;
    else
        return <LocaleSelectionPage/>;
}

export default Dispatcher;