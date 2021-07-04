import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
    },
    input: {
        display: "none",
    },
}));

const LoginButton = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Button variant="outlined" color="secondary">Login</Button>
        </div>
    );
};

export default LoginButton;