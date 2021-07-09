import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    inputLabel: {
      fontSize: 20,
      color: 'white',
    },
    adornment: {
      color: 'white',
    },
}));

const InformationForm = ({label, icon, onChange}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate>
            <FormControl className={classes.margin}>
                <InputLabel 
                    shrink 
                    htmlFor="bootstrap-input"
                    className={classes.inputLabel}>
                    {label}
                </InputLabel>
                <BootstrapInput 
                  id="bootstrap=input"
                  onChange={onChange}
                  startAdornment={
                    <InputAdornment className={classes.adornment} position="start">
                      {icon}
                    </InputAdornment>
                  }
                />
            </FormControl>
        </form>
    );
};

export default InformationForm;