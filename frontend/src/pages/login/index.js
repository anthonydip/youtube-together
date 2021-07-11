import { Link, useHistory } from 'react-router-dom';
import Styles from './Styles.module.css';
import { useContext, useState } from 'react';
import React from 'react';
import { UserContext } from '../../contexts/user/UserContext';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal';

import { socket } from '../../components/Socket/socket';

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

const Login = () => {
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    let history = useHistory();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

        // Move back to home page if signed in
        if(user.logged){
            history.push("/");
        }
    }

    const handleSubmit = () => {
        let error = false;

        // Check sign in
        socket.emit("check signin", email, password, (response) => {
            console.log("response: " + response);
            // Email does not exist
            if(response === "not exist"){
                error = true;
                setMessage("Email address does not exist!");
            }
            // Incorrect password
            else if(response === "fail"){
                error = true;
                setMessage("Incorrect password!");
            }
            else{
                setMessage("Successfully signed in!");
            }
        });

        // Sign in
        setTimeout(() => {
            handleOpen();

            if(!error){
                socket.emit("signin", email, (response) => {
                    console.log(response);
                    setUser({
                        uid: response.id,
                        username: response.username,
                        email: response.email,
                        logged: true,
                    });
                })
            }
        }, 750);
    }

    return (
        <div>
            <Link to="/">
                <IconButton color="secondary" aria-label="home">
                    <NavigateBefore/>
                </IconButton>
            </Link>

            <p className={Styles.signInLabel}>Sign In</p>
            
            <InformationForm label="Email Address" icon={<Email/>} type="text" onChange={handleEmailChange}/>
            <InformationForm label="Password" icon={<Lock/>} type="password" onChange={handlePassChange}/>

            <Box textAlign='center'>
                <Button style={{width: 235, marginTop: 10}} onClick={handleSubmit}  variant="contained" color="primary">SIGN IN</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Sign In</h2>
                    <p id="simple-modal-description">
                        {message}
                    </p>
                </div>
            </Modal>
            
            <div className={Styles.separator}>
                OR
            </div>

            <Box textAlign='center'>
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <Button style={{width: 235, marginTop: 20}} variant="outlined" color="primary">Create Account</Button>
                </Link>
            </Box>
            
        </div>
    );
};

export default Login;