import './App.css';
import styles from './Styles.module.css';
import YouTube from 'react-youtube';
import { Button } from 'react-bootstrap';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Slider from '@material-ui/core/Slider';
import Fullscreen from '@material-ui/icons/Fullscreen';
import VolumeDown from '@material-ui/icons/VolumeDown';
import { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// github auth token
// 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

// NOTE: TRY GET PLAY PAUSE BUTTON TO SWITCH ON CLICK

// WORKING ON:
// show video duration
// add volume + mute button

// add light/dark mode
// add database for login
// implement login for usernames
// add chat box on the right of video
// implement server for multiple users to interact and watch together
//    - state changes on the video
//           - when a user changes a state using the interface, a signal will be sent to the server (e.g pause), and the server will send the signal to all connected users

// Global variable to hold the event prop passed from the YouTube component when video is ready
var videoEvent = null;

var timer;

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

const useStyles = makeStyles({
  root: {
    width: 720,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const App = () => {
  const classes = useStyles();
  const textFieldClasses = useTextFieldStyles();
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCode, setVideoCode] = useState('');

  // YouTube video player options
  const opts = {
    height: '480',
    width: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
    },
  };

  const durationLoop = () => {
    timer = setInterval(() => {
      if(!videoEvent){
        return;
      }
      // console.log("current: " + videoEvent.target.getCurrentTime() + ", duration: " + videoEvent.target.getDuration());
      var fraction = videoEvent.target.getCurrentTime()/videoEvent.target.getDuration()*100;
      // console.log("timer: " + timer + ",fraction: " + fraction);
      setTimeLeft(fraction);
    }, 200);
  }

  const handlePlay = () => {
    if(videoEvent === null){
      // do something
    }
    else{
      videoEvent.target.playVideo();
      if(!timer){
        durationLoop();
      }
      setPlaying(true);
    }
  }

  const handlePause = () => {
    if(videoEvent === null){
      // do something
    }
    else{
      videoEvent.target.pauseVideo();
      clearInterval(timer);
      timer = null;
      setPlaying(false);
    }
  }

  const handleStateChange = event => {
    switch(event.data){
      // Video unstarted when loaded
      case -1:
        // code
        return;
      // Video ended
      case 0:
        // videoEvent = null;
        clearInterval(timer);
        timer = null;
        return;
      // Video playing
      case 1:
        if(!playing){
          event.target.pauseVideo();
        }
        return;
      // Video paused
      case 2:
        if(playing){
          event.target.playVideo();
        }
        return;
      // Video buffering
      case 3:
        // code
        return;
      // Video cued
      case 5:
        // code
        return;
      default:
        throw new Error();
    }
  }

  const handleVideoReady = event => {
    // console.log("VIDEO DURATION: " + event.target.getDuration());
    videoEvent = event;
    event.target.pauseVideo();
  }

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
    
    // console.log("timer: " + timer + ", move: " + timeInVideo);
  };

  // textfield change
  const handleVideoChange = event => {
    setVideoUrl(event.target.value);
  };

  // submit video
  const handleVideoSubmit = event => {
    var code = videoUrl.split("v=")[1].split("&")[0];
    setVideoCode(code);
    event.preventDefault();
  };

  // toggle mute
  const handleVolumeClick = () => {
    // unmute
    if(videoEvent.target.isMuted()){
      console.log("unmuted");
      videoEvent.target.unMute();
    }
    // mute
    else{
      console.log("muted");
      videoEvent.target.mute();
    }
  }

  return (
    <div>
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

      <div className={styles.player}>
        <YouTube aria-labelledby="continuous-slider" videoId={videoCode} opts={opts} onReady={handleVideoReady} onStateChange={handleStateChange}/>
      </div>

      {/* duration slider */}
      <div className={classes.root} >
        <Slider value={timeLeft || 0} step={0.01} min={0} max={100} color="secondary" onChange={handleProgressChange}/>
      </div>
      
      <div className={styles.controlContainer}>
          <Button className={styles.playBtn} onClick={handlePlay}>
            <PlayArrow color="secondary"/>
          </Button>
          <Button className={styles.pauseBtn} onClick={handlePause}>
            <Pause color="secondary"/>
          </Button>
          <Button className={styles.volumeBtn} onClick={handleVolumeClick}>
            <VolumeDown color="secondary"/>
          </Button>
        
          
      </div>

    </div>
  );
}

export default App;
