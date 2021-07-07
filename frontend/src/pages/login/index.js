import { Link } from 'react-router-dom';
import Styles from './Styles.module.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

import EmailForm from '../../components/EmailForm';
import PasswordForm from '../../components/PasswordForm';

const Login = () => {
    return (
        <div>
            <Link to="/">
                <IconButton color="secondary" aria-label="home">
                    <NavigateBefore/>
                </IconButton>
            </Link>

            <p className={Styles.signInLabel}>Sign In</p>
            
            <EmailForm/>
            <PasswordForm/>

            <Box textAlign='center'>
                <Button style={{width: 235, marginTop: 10}} variant="contained" color="primary">SIGN IN</Button>
            </Box>
            
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