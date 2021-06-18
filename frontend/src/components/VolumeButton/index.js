import Styles from './Styles.module.css';
import { Button } from 'react-bootstrap';
import VolumeDown from '@material-ui/icons/VolumeDown';

const VolumeButton = ({videoEvent}) => {
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

    return(
        <Button className={Styles.volumeBtn} onClick={handleVolumeClick}>
            <VolumeDown color="secondary"/>
        </Button>
    );
};

export default VolumeButton;