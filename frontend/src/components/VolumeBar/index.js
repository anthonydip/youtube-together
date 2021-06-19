import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        position: "absolute",
        height: 300,
        right: 30,
    },
});

const VolumeBar = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Slider orientation="vertical" defaultValue={100} aria-labelledby="vertical-slider" color="secondary"/>
        </div>
    );
};

export default VolumeBar;