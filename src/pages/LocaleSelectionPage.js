import React, {useContext, useEffect, useState} from 'react';
import AppBus from "../domain/AppBus";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {GlobalContext} from "../context/AppContext";
import AppWrapper from "../containers/AppWrapper";
import LinearProgress from "@material-ui/core/LinearProgress";

LocaleSelectionPage.propTypes = {

};

function LocaleSelectionPage(props) {
    const [localeList, setLocaleList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {setLocale} = useContext(GlobalContext);

    useEffect(() => {
        setIsLoading(true);
        const client = AppBus.getClient();
        client.getAvailableLocales().then(localeList => {
            setLocaleList(localeList);
        }).finally(() => setIsLoading(false));
    }, []);

    return (
        <AppWrapper>
            <Grid direction="row" container justify="center" alignItems="center" style={{height: "100%"}}>
                <Paper>
                    <Card>
                        <CardContent>
                            <Typography variant="h3" component="h2" color="textPrimary" align="center" display="block" gutterBottom>Select yor country</Typography>
                            <Grid container>
                                {localeList.map(locale => (<Grid key={locale.getId()} item xl={3} lg={3} md={6} sm={12} xs={12}>
                                    <Button variant="text" fullWidth size="large" onClick={() => setLocale(locale.getId())}>{locale.getName()}</Button>
                                </Grid>))}
                            </Grid>
                            {isLoading && <LinearProgress/>}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </AppWrapper>
    );
}

export default LocaleSelectionPage;