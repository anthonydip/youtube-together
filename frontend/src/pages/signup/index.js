import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Styles from './Styles.module.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal';

import InformationForm from '../../components/InformationForm';

function getModalStyle() {
    const top = 45
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Signup = ({socket}) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log("email: " + email);
    }

    const handleUserChange = (event) => {
        setUsername(event.target.value);
        console.log("user: " + username);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
        console.log("pass: " + password);
    }

    const handleSubmit = () => {
        let error = false;

        // Check textfields are filled
        if(!email || !username || !password){
            setMessage("No textfields can be empty");
            error = true;
        }

        // Check if email or username already exists

        // Open error modal
        if(error){
            handleOpen();
        }
        else{
            console.log("SUBMITTING");
            console.log(email);
            console.log(username);
            console.log(password);

        }
    }

    return(
        <div>
            <Link to="/login" style={{ textDecoration: 'none'}}>
                <IconButton color="secondary" aria-label="home">
                    <NavigateBefore/>
                </IconButton>
            </Link>

            <p className={Styles.signUpLabel}>Create Account</p>

            <InformationForm label="Email Address" icon={<Email/>} onChange={handleEmailChange}/>
            <InformationForm label="Username" icon={<AccountCircle/>} onChange={handleUserChange}/>
            <InformationForm label="Password" icon={<Lock/>} onChange={handlePassChange}/>

            <Box textAlign='center'>
                <Button style={{width: 235, marginTop: 10}} onClick={handleSubmit} variant="contained" color="primary">CREATE ACCOUNT</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Error creating account</h2>
                    <p id="simple-modal-description">
                        {message}
                    </p>
                </div>
            </Modal>

            <div className={Styles.separator}>
                OR
            </div>

            <Box textAlign='center'>
                <Link to="/login" style={{ textDecoration: 'none'}}>
                    <Button style={{width: 235, marginTop: 20}} variant="outlined" color="primary">SIGN IN</Button>
                </Link>
            </Box>

        </div>
    );
};

export default Signup;