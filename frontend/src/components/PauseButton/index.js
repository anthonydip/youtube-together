import Styles from './Styles.module.css';
import Pause from '@material-ui/icons/Pause';
import { Button } from 'react-bootstrap';

const PauseButton = ({socket, videoEvent, timer, setPlaying}) => {

    const handlePause = () => {
        if(videoEvent === null){
          // do something
        }
        else{
          videoEvent.target.pauseVideo();
          clearInterval(timer);
          timer = null;
          setPlaying(false);

          socket.emit("pause", "Pressed pause");
        }
    }

    return(
        <Button className={Styles.pauseBtn} onClick={handlePause}>
            <Pause color="secondary"/>
        </Button>
    );
};

export default PauseButton;