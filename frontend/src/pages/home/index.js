import Styles from './Styles.module.css';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import SearchForm from '../../components/SearchForm';
import ProgressionBar from '../../components/ProgressionBar';
import PlayButton from '../../components/PlayButton';
import PauseButton from '../../components/PauseButton';
import VolumeButton from '../../components/VolumeButton';
import VolumeBar from '../../components/VolumeBar';
import LoginButton from '../../components/LoginButton';

// socket io client
import { socket } from '../../components/Socket/socket.js';

// NOTE: TRY GET PLAY PAUSE BUTTON TO SWITCH ON CLICK

// WORKING ON:
// implement server for multiple users to interact and watch together
//    - load the same video for connected sockets
//    - 

// TO-DO:
// add database for login
//    - implement login for usernames
//    - local storage to stay logged in?
// add chat box on the right of video
// add light/dark mode

// Global variable to hold the event prop passed from the YouTube component when video is ready
var videoEvent = null;

// Timer variable to update progress bar on set interval
var timer;

const Home = () => {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCode, setVideoCode] = useState('');
  const [volume, setVolume] = useState(50);
  const [volumeLabel, setVolumeLabel] = useState('50');
  const [duration, setDuration] = useState('0:00 / 0:00');

  // update volume label on volume change
  useEffect(() => {
    if(videoEvent){
      setVolumeLabel(volume.toString());
    }
  }, [volume]);

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
      var fraction = videoEvent.target.getCurrentTime()/videoEvent.target.getDuration()*100;

      // calculate for duration display
      var curMinutes = Math.floor(videoEvent.target.getCurrentTime() / 60);
      var curSeconds = Math.floor(videoEvent.target.getCurrentTime() - curMinutes * 60);
      var durMinutes = Math.floor(videoEvent.target.getDuration() / 60);
      var durSeconds = Math.floor(videoEvent.target.getDuration() - durMinutes * 60);

      curSeconds = curSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
      durSeconds = durSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

      setDuration(curMinutes + ":" + curSeconds + " / " + durMinutes + ":" + durSeconds)
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
    videoEvent = event;
    event.target.pauseVideo();
  }

  // received new video to load
  socket.on("submit", (code) => {
    console.log("NEW VIDEO: " + code);
    setVideoCode(code);
  });

  // received play event
  socket.on("play", () => {
    if(videoEvent){
      videoEvent.target.playVideo();
      durationLoop();
      setPlaying(true);
    }
  });

  // received pause event
  socket.on("pause", () => {
    if(videoEvent){
      videoEvent.target.pauseVideo();
      clearInterval(timer);
      timer = null;
      setPlaying(false);
    }
  });

  // received skip event
  socket.on("skip", (newValue, timeInVideo) => {
    if(videoEvent === null){
      return;
    }

    if(!timer){
      durationLoop();
    }

    // move slider thumb
    setTimeLeft(newValue);

    // move actual video to new slider point
    videoEvent.target.seekTo(timeInVideo);
  });

  return (
    <div>
      <div className={Styles.loginBtn}>
        <Link to="/login" style={{ textDecoration: 'none'}}>
          <LoginButton/>
        </Link>
      </div>
      
      <SearchForm socket={socket} videoUrl={videoUrl} setVideoUrl={setVideoUrl} setVideoCode={setVideoCode}/>

      <div className={Styles.player}>
        <YouTube aria-labelledby="continuous-slider" videoId={videoCode} opts={opts} onReady={handleVideoReady} onStateChange={handleStateChange}/>
      </div>

      {/* duration slider */}
      <ProgressionBar socket={socket} timer={timer} videoEvent={videoEvent} timeLeft={timeLeft} setTimeLeft={setTimeLeft} durationLoop={durationLoop}/>      

      <div className={Styles.controlContainer}>
          <PlayButton socket={socket} videoEvent={videoEvent} timer={timer} durationLoop={durationLoop} setPlaying={setPlaying}/>
          <PauseButton socket={socket} videoEvent={videoEvent} timer={timer} setPlaying={setPlaying}/>
          <span className={Styles.durationLabel}>{duration}</span>
          <p className={Styles.volumeLabel}>{volumeLabel}</p>
          <VolumeBar videoEvent={videoEvent} volume={volume} setVolume={setVolume}/>
          <VolumeButton videoEvent={videoEvent} setVolumeLabel={setVolumeLabel}/>
          
      </div>

    </div>
  );
}

export default Home;
