import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
      width: 720,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
});

const ProgressionBar = ({socket, timer, videoEvent, timeLeft, setTimeLeft, durationLoop}) => {
    const classes = useStyles();

    const handleProgressChange = (event, newValue) => {
        if(videoEvent === null){
          return;
        }
    
        if(!timer){
          durationLoop();
        }
    
        // move slider thumb
        setTimeLeft(newValue);
    
        // calculated new time in the video from new slider value
        var timeInVideo = newValue*videoEvent.target.getDuration()/100;
    
        // move actual video to new slider point
        videoEvent.target.seekTo(timeInVideo);
        
        socket.emit("skip", newValue, timeInVideo);
    };

    return(
        <div className={classes.root} >
            <Slider value={timeLeft || 0} step={0.01} min={0} max={100} color="secondary" onChange={handleProgressChange}/>
        </div>
    );
};

export default ProgressionBar;