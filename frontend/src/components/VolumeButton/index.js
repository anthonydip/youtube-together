import Styles from './Styles.module.css';
import { Button } from 'react-bootstrap';
import VolumeDown from '@material-ui/icons/VolumeDown';

const VolumeButton = ({videoEvent, setVolumeLabel}) => {

    const handleVolumeClick = () => {
      if(videoEvent){
        // unmute
        if(videoEvent.target.isMuted()){
          videoEvent.target.unMute();
          setVolumeLabel(videoEvent.target.getVolume());
        }
        // mute
        else{
          videoEvent.target.mute();
          setVolumeLabel("Muted");
        }
      }
    }

    return(
        <Button className={Styles.volumeBtn} onClick={handleVolumeClick}>
            <VolumeDown color="secondary"/>
        </Button>
    );
};

export default VolumeButton;