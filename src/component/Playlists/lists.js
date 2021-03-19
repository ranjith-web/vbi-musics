import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { getCache } from '../../service/appServices';
import './styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
}));
  
function Generate( { data, clickHandler } ) {
    return data && data.map((d, idx) => <div key={idx}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                    <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={d.name}
                    secondary={d.createdAt}
                />
                <ListItemSecondaryAction onClick={(e) => clickHandler(e, d)}>
                    <IconButton edge="end" aria-label="arrow">
                    <ArrowForwardIosIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}

const Lists = ( { selectedPlist } ) => {
    const classes = useStyles();
    const [dense] = React.useState(false);
    const getPlCache = getCache("Playlists");
    const playlists = typeof getPlCache === "string" ? JSON.parse(getPlCache) : getPlCache;
    const goToTracksOfPL = (e, pl) => {
        selectedPlist(pl);
    }

    return (
        <div className={classes.demo}>
            <List dense={dense}>
                {playlists.length > 0 ? <Generate data={playlists} clickHandler={goToTracksOfPL}/> : <div className="nodatafound"><h4>No Data Found</h4></div>}
            </List>
        </div>
    );
}
  
export default Lists;

