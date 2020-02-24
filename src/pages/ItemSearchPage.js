import React, {useEffect, useRef, useState} from 'react';
import AppBus from "../domain/AppBus";
import AppWrapper from "../containers/AppWrapper";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../components/SearchInput";
import ResultItemList from "../components/ResultItemList";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import SearchIcon from '@material-ui/icons/Search';

function ItemSearchPage(props) {
    const client = AppBus.getClient();
    const inputRef = useRef();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSearchFabVisible, setIsSearchFabVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = () => {
        setIsSearchFabVisible(window.scrollY > inputRef.current.offsetTop);
    };

    const onSearch = query => {
        if(!query) {
            setResults([]);
            return;
        }

        setIsLoading(true);

        client.searchMoviesAndTvShows(query).then(
            r => {
                setResults(r);
                setError(null);
            }
        ).catch(
            error => {
                setError(error.message);
            }
        ).finally(
            () => {
                setIsLoading(false);
            }
        );
    };

    const goToSearchInput = () => {
        inputRef.current.focus();
    };

    return (
        <AppWrapper>
            <Grid direction="row" container justify="center" alignItems="center" style={{height: "100%"}}>
                <Paper style={{padding: "5px 10px"}}>
                    <SearchInput onChange={onSearch} ref={inputRef}/>

                    <ResultItemList results={results} loading={isLoading} />

                    <Snackbar open={error != null} autoHideDuration={7000} onClose={() => setError(null)}>
                        <Alert severity="error">{error}</Alert>
                    </Snackbar>
                </Paper>
            </Grid>
            {isSearchFabVisible && <Fab color="primary" aria-label="Search" style={{position: "fixed", bottom: "6em", right: "6em"}} onClick={goToSearchInput}>
                <SearchIcon/>
            </Fab>}
        </AppWrapper>
    );
}

export default ItemSearchPage;