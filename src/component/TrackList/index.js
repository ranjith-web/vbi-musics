import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './styles.css';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

const TrackLists = (props) => {
    const { onAddToPlaylist, onDeleteToPlaylist, mode, ...rest } = props;
    const addToListClass = props.mode ? "addTolist": "mHide";
    const classes = useStyles();

    
    return (
        <ul className="tracks margTop0"> 
            <ul className="stream-tracks">
                <li>
                    {<img src={props.thumbnailUrl} alt="thumbnail"/>}
                </li>
                <li className="small-play">
                    <i className="fa fa-play" aria-hidden="true"></i>
                </li>
                <ul>
                    <li>
                        <span><h4>{props.albumName}</h4></span>
                    </li>
                    <li>
                        <span>{props.title}</span>
                    </li>
                </ul>
                <div>
                    <i className="fa fa-clock-o"></i>4.35
                </div>
                <ul className={addToListClass}>
                    <div>
                        { mode === "Static" ? <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => onDeleteToPlaylist(rest)}>
                            Delete
                        </Button>
                        : <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => onAddToPlaylist(rest)}>
                        Add To List
                    </Button> }
                    </div>
                </ul>
            </ul>
        </ul>
    );
}
  
export default TrackLists;