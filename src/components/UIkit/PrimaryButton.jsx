import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    button: {
      backgroundColor: 'skyblue',
      opacity: 0.9,
      color: '#000',
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
      '&:hover': {
        backgroundColor: 'skyblue',
        opacity: 1.0,
      },
    },
  });
  

const PrimaryButton = (props) => {
    const classes = useStyles();
    const { label, onClick } = props;

    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    );
};

export default PrimaryButton;