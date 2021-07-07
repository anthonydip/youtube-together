import { Link } from 'react-router-dom';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

const Signup = () => {
    return(
        <Link to="/login" style={{ textDecoration: 'none'}}>
            <IconButton color="secondary" aria-label="home">
                <NavigateBefore/>
            </IconButton>
        </Link>
    );
};

export default Signup;