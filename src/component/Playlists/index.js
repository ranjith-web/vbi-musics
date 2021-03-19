import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import moment from 'moment';
import Lists from './lists';
import Tracks from './tracks';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { setCache } from '../../service/appServices';
import { alertService } from '../../service/alertService';
import { addPlaylists, addTracks, deleteTracks } from '../../store/action/playlists_action';
import './styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}))

const Playlists = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ cSPlist, setCSPlist ] = useState(null);
    const [open, setOpen] = useState(false);
    const [plistName, setPlistName] = useState("");
    const [selectedPl, setSelectedPl] = useState({});
    const playlistsState = useSelector(state => state.playlists);
    
    const addPlaylist = () => {
        const { playlists } = playlistsState;
        const findUnique = playlists.filter((o) => o.name === plistName );
        if(findUnique.length === 0){        
            const _playlist = {
                name: plistName,
                tracks:[]
            }
            dispatch(addPlaylists(_playlist));
        } else {
            alertService.success(`Playlist ${plistName} is already present. Please try another.`, { autoClose: true, keepAfterRouteChange: false });
        }
    }

    const onNameChange = (evt) => {
        setPlistName(evt.target.value);
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        addPlaylist();
        handleClose();
        setPlistName("");
    }

    const selectedPlist = (pl) => {
        setSelectedPl(pl);
    }

    const addTracksHandler = (songs) => {
        const { playlists } = playlistsState;
        const idx = _.findIndex(playlists, (o) => o.name === selectedPl.name );
        songs.albumName = selectedPl.name;
        dispatch(addTracks(songs))
        alertService.success(`Added to ${playlists[idx].name} playlist !!`, { autoClose: true, keepAfterRouteChange: false });
    }

    const onDeleteToPlaylist = (song) => {
        const { playlists } = playlistsState;
        const idx = _.findIndex(playlists, (o) => o.name === selectedPl.name );
        song.albumName = selectedPl.name;
        dispatch(deleteTracks(song));
        alertService.success(`Removed song from ${playlists[idx].name} playlist !!`, { autoClose: true, keepAfterRouteChange: false });
    }

    const clearSelectedPList = () => {
        setSelectedPl({});
    }

    return (
        <main className="playlists">
            <section className="stream">
                <ul className="stream-header stream-splitter">
                    <li>
                        <h1>Playlists</h1>
                    </li>
                    <li className="removetitle addPlaylist">
                        <div className={classes.root}>
                            <IconButton className="add-playlist-icon" color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </div>
                    </li>
                </ul>
                { _.isEmpty(selectedPl) ? <Lists selectedPlist={selectedPlist}/> : <Tracks playListAddHandler={addTracksHandler} clearSelectedPList={clearSelectedPList} pl={playlistsState.playlists.filter(x => x.uid === selectedPl.uid )[0]} onDeleteToPlaylist={onDeleteToPlaylist}/> }
            </section>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Playlist</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To create a playlist, please enter your playlist name here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Playlist Name"
                    type="text"
                    fullWidth
                    value={plistName}
                    onChange={onNameChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
  
export default Playlists;

