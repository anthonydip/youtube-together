import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useTextFieldStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      color: 'white',
    },
    inputLabel: {
      color: 'white',
    },
    margin: {
      margin: theme.spacing(1),
    },
}));

const SearchForm = ({videoUrl, setVideoUrl, setVideoCode}) => {
    const textFieldClasses = useTextFieldStyles();

    const handleVideoChange = event => {
        setVideoUrl(event.target.value);
    }

    const handleVideoSubmit = event => {
        var code = videoUrl.split("v=")[1].split("&")[0];
        setVideoCode(code);
        event.preventDefault();
    };

    return(
        <form onSubmit={handleVideoSubmit} className={textFieldClasses.root} noValidate>
            <CssTextField
                className={textFieldClasses.margin}
                label="Video URL"
                variant="outlined"
                id="custom-css-outlined-input"
                onChange={handleVideoChange}
                InputProps={{
                    className: textFieldClasses.input,
                }}
                InputLabelProps={{
                    className: textFieldClasses.inputLabel,
                }}
                style={{
                    width: 720,
                    marginTop: 50,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            />
        </form>   
    )
};

export default SearchForm;