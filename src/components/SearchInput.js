import React, {forwardRef, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Input} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from "@material-ui/core/LinearProgress";

const CHANGE_TIME_OUT = 1500;
const PROGRESS_UPDATE_INTERVAL = 150;

const SearchInput = forwardRef(({onChange}, ref) => {
    const [changeTimeoutId, setChangeTimeoutId] = useState(null);
    const [progressIntervalId, setProgressIntervalId] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const changeTimeoutIdIdRef = useRef(changeTimeoutId);
    changeTimeoutIdIdRef.current = changeTimeoutId;
    const progressIntervalIdRef = useRef(progressIntervalId);
    progressIntervalIdRef.current = progressIntervalId;

    const _resetTime = () => {
        if(changeTimeoutIdIdRef.current) {
            clearTimeout(changeTimeoutIdIdRef.current);
            setChangeTimeoutId(null);
        }

        if(progressIntervalIdRef.current) {
            clearInterval(progressIntervalIdRef.current);
            setProgressIntervalId(null);
        }

        setTimeElapsed(0);
    };

    const _onChange = ev => {
        _resetTime();

        const val = ev.currentTarget.value;

        if(!val){
            onChange("");
            return;
        }

        const _intervalId = setInterval(() => {
            setTimeElapsed(oldTimeElapsed => oldTimeElapsed + PROGRESS_UPDATE_INTERVAL);
        }, PROGRESS_UPDATE_INTERVAL);

        setProgressIntervalId(_intervalId);

        const _timeoutId = setTimeout(() => {
            _resetTime();
            onChange(val);
        }, CHANGE_TIME_OUT);

        setChangeTimeoutId(_timeoutId);
    };

    useEffect(() => {
        return _resetTime;
    }, []);

    return (
        <React.Fragment>
            <FormControl fullWidth size="medium">
                <Input
                    autoFocus
                    inputRef={ref}
                    onChange={_onChange}
                    placeholder="Search"
                    style={{fontSize: 65}}
                    fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon style={{fontSize: 65}}/>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <LinearProgress variant="determinate" value={(timeElapsed / CHANGE_TIME_OUT) * 100} style={{visibility: timeElapsed > 0 ? "visible" : "hidden"}}/>
        </React.Fragment>
    );
});

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default SearchInput;