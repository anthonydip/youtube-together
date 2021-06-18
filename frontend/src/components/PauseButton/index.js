import Styles from './Styles.module.css';
import Pause from '@material-ui/icons/Pause';
import { Button } from 'react-bootstrap';

const PauseButton = ({videoEvent, timer, setPlaying}) => {

    const handlePause = () => {
        if(videoEvent === null){
          // do something
        }
        else{
          videoEvent.target.pauseVideo();
          clearInterval(timer);
          timer = null;
        //   console.log("timer after pause: " + timer);
          setPlaying(false);
        }
    }

    return(
        <Button className={Styles.pauseBtn} onClick={handlePause}>
            <Pause color="secondary"/>
        </Button>
    );
};

export default PauseButton;