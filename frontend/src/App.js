import './App.css';
import styles from './Styles.module.css';
import YouTube from 'react-youtube';
import { useState } from 'react';

// components
import SearchForm from './components/SearchForm';
import ProgressionBar from './components/ProgressionBar';
import PlayButton from './components/PlayButton';
import PauseButton from './components/PauseButton';
import VolumeButton from './components/VolumeButton';

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

const App = () => {
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

  return (
    <div>
      <SearchForm videoUrl={videoUrl} setVideoUrl={setVideoUrl} setVideoCode={setVideoCode}/>

      <div className={styles.player}>
        <YouTube aria-labelledby="continuous-slider" videoId={videoCode} opts={opts} onReady={handleVideoReady} onStateChange={handleStateChange}/>
      </div>

      {/* duration slider */}
      <ProgressionBar timer={timer} videoEvent={videoEvent} timeLeft={timeLeft} setTimeLeft={setTimeLeft} durationLoop={durationLoop}/>
      
      <div className={styles.controlContainer}>
          <PlayButton videoEvent={videoEvent} timer={timer} durationLoop={durationLoop} setPlaying={setPlaying}/>
          <PauseButton videoEvent={videoEvent} timer={timer} setPlaying={setPlaying}/>
          <VolumeButton videoEvent={videoEvent}/>
      </div>

    </div>
  );
}

export default App;
