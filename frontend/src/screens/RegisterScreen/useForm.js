import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
}));

export const useForm = (initialFValues, validateOnChange = false, validate) => {
    const [values, setValues] = useState(initialFValues);
    const [errorMessage, setError] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validateOnChange) validate({ [name]: value });
    };

    const resetForm = () => {
        setValues(initialFValues);
        setError({});
    };

    return {
        values,
        setValues,
        errorMessage,
        setError,
        handleInputChange,
        resetForm,
    };
};

export const Form = (props) => {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete='off' {...other}>
            {props.children}
        </form>
    );
};
