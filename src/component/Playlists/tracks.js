import { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AllSongs from '../AllSongs';
import TrackLists from '../TrackList';
import { getCache } from '../../service/appServices';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));
  
const Tracks = (props) => {
    const classes = useStyles();
    const [albums] = useState(
        getCache('Albums') || []
    );
    const [isAddSongViewEnabled, setIsAddSongViewEnabled] = useState(false);
    const [pListTrack, setPListTrack] = useState([]);

    useEffect(() => {
        if( props.pl.tracks.length > 0 ){
            const _tracks = sortedDates(props.pl.tracks);
            setPListTrack([..._tracks]);
        }
    }, [props.pl.tracks]);

    const sortedDates = ( data ) => {
        const result = data.sort(function (v1, v2) { 
            var a = new Date(v1.createdAt), b = new Date(v2.createdAt);
            if (a < b)
                return 1;
            if (a > b)
                return -1;
            
            return 0;
        });
        return result;
    }
    const shuffleTrack = () => {
        const shuffle = pListTrack.sort(() => Math.random() - 0.5);
        setPListTrack([...shuffle]);
    }

    const viewEncapsulateForAddSongs = () => {
        setIsAddSongViewEnabled(prevState => !prevState);
    }
    const goToAlbums = () => {
        props.clearSelectedPList();
    }
    
    const goToTracks = () => {
        setIsAddSongViewEnabled(false);
    }
    return (
        <section>
            <div>
                { !isAddSongViewEnabled ? 
                <div className="float-right">
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={goToAlbums}>
                        Go To Albums
                    </Button>
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={shuffleTrack}>
                        Shuffle
                    </Button>
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={viewEncapsulateForAddSongs}>
                        Add Songs
                    </Button>
                </div>
                : <div className="float-right">
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={goToAlbums}>
                        Go To Albums
                    </Button>
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={goToTracks}>
                        Go To Tracks
                    </Button>
                </div>}
                { !isAddSongViewEnabled ?
                    <Fragment>
                    { pListTrack.length > 0 ? pListTrack.map((song, index) => {
                        return ( <div key={index}>
                            <TrackLists 
                                mode="Static" 
                                {...song} 
                                albumName={albums.filter(x => x.id === song.albumId)[0].title} 
                                onDeleteToPlaylist={props.onDeleteToPlaylist}
                            />
                        </div> )
                    }) : <div className="space_container"><h4>No Data Found</h4></div>}
                    </Fragment>
                : null }
                { isAddSongViewEnabled ? 
                    <AllSongs mode="Add" onAddToPlaylist={props.playListAddHandler} />
                : null }
            </div>
        </section>
    );
}
  
export default Tracks;

