import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import LanguageIcon from '@material-ui/icons/Language';
import Logo from '../assets/img/logo.jpg';
import {GlobalContext} from "../context/AppContext";

AppWrapper.propTypes = {
    children: PropTypes.any
};

function AppWrapper({children}) {
    const globalContext = useContext(GlobalContext);
    const setLocale = globalContext.setLocale;
    const locale = globalContext.locale;

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <div style={{flexGrow: 1, padding: "0.4em 0"}}>
                        <img src={Logo} alt="Where Watch"/>
                    </div>
                    {locale != null && <Button variant="outlined" startIcon={<LanguageIcon/>} onClick={() => {setLocale(null)}}>{locale}</Button>}
                </Toolbar>
            </AppBar>

            <Container style={{height: "calc(100% - 100px)"}}>
                <Container style={{height: "100%"}}>
                    {children}
                </Container>
            </Container>
        </React.Fragment>
    );
}

export default AppWrapper;