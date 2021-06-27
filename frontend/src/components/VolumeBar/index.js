import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        WebkitAppearance: 'none',
        backgroundColor: "#1b1c1d",
        WebkitTransition: 0.2,
        transition: 'opacity 0.2',
        width: 75,
        opacity: 0.7,
        float: 'right',
        height: 20,
        '&:hover': {
            opacity: 1,
        },
        marginRight: 20,
    },
});

const VolumeBar = ({videoEvent, volume, setVolume}) => {
    const classes = useStyles();

    // WAS WORKING HERE
    const handleVolumeChange = (event, newVolume) => {
        setVolume(newVolume);
        if(videoEvent){
            videoEvent.target.setVolume(newVolume);
            console.log("volume: " + videoEvent.target.getVolume());
        }
    }

    return(
        <div className={classes.root}>
            <Slider 
                min={0}
                max={100} 
                value={volume} 
                onChange={handleVolumeChange} 
                defaultValue={50} 
                aria-labelledby="vertical-slider" 
                color="secondary" 
            />
        </div>
    );
};

export default VolumeBar;