import Styles from './Styles.module.css';
import { Button } from 'react-bootstrap';
import VolumeDown from '@material-ui/icons/VolumeDown';

const VolumeButton = ({videoEvent, setHovering}) => {

    const handleVolumeClick = () => {
        // unmute
        if(videoEvent.target.isMuted()){
          videoEvent.target.unMute();
        }
        // mute
        else{
          videoEvent.target.mute();
        }
    }

    const handleHover = () => {
      setHovering(true);
    };

    const handleLeave = () => {
      setHovering(false);
    }

    return(
        <Button className={Styles.volumeBtn} onClick={handleVolumeClick} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <VolumeDown color="secondary"/>
        </Button>
    );
};

export default VolumeButton;