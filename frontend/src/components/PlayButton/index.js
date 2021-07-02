import PlayArrow from '@material-ui/icons/PlayArrow';
import { Button } from 'react-bootstrap';
import Styles from './Styles.module.css';

const PlayButton = ({socket, videoEvent, durationLoop, setPlaying}) => {

    const handlePlay = () => {
        if(videoEvent === null){
          // do something
        }
        else{
          videoEvent.target.playVideo();
          durationLoop();
          setPlaying(true);

          socket.emit("play", "Pressed play");
        }
    }

    return(
        <Button className={Styles.playBtn} onClick={handlePlay}>
            <PlayArrow color="secondary"/>
        </Button>
    );
};

export default PlayButton;