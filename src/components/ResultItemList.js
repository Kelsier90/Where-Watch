import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from "./ResultItem/index";
import Grid from "@material-ui/core/Grid";

ResultItemList.propTypes = {
    results: PropTypes.array,
    loading: PropTypes.bool
};

function ResultItemList({results = [], loading = false}) {
    const loadingComponent = loading === true ?
        <React.Fragment>
            {[...Array(4).keys()].map(key =>
                <Grid key={`item_loading_${key}`} item lg={6} sm={12}>
                    <ResultItem item={null}/>
                </Grid>)}
        </React.Fragment>
        : null;
    return (
        <Grid container>
            {loadingComponent}

            {results.map(item =>
                <Grid key={`item_${item.getId()}`} item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <ResultItem item={item}/>
                </Grid>
            )}
        </Grid>
    );
}

export default ResultItemList;