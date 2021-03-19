import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './component/NavBar';
import AllSongs from './component/AllSongs';
import Alert from './component/Alert';
import Playlists from './component/Playlists';
import { getAlbum, setCache, getCache } from './service/appServices';
import { loadPlaylists } from './store/action/playlists_action';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'inline-block',
      position: 'absolute',
      right: '50%',
      top: '50%',
      '& > * + *': {
          marginLeft: theme.spacing(2),
      },
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ albums, setAlbums ] = useState([]); 
  useEffect(() => {
    alert("hiii came in")
    async function fetchAlbums() {
        const resAlbums = await getAlbum();
        setAlbums(resAlbums.data);
        setCache("Albums", resAlbums.data);
    }
    fetchAlbums();
  }, []);

  useEffect(() => {
    const getPlaylists = getCache("Playlists"); 
    if( ! getPlaylists ){
      setCache("Playlists", JSON.stringify([]));
      dispatch(loadPlaylists([]));
    } else {
      dispatch(loadPlaylists(getPlaylists));
    }
  }, [dispatch]);
  
  return (
      <Router>
        <div className="App">
          <NavBar />
          {albums.length > 0 ?   
            <main className="main">
              <Alert />
              <Route exact path="/">
                  <Redirect to="/allsongs" />
              </Route>
              <Route exact path="/allsongs" component={AllSongs}/>
              <Route path='/playlists' component={Playlists}/>
            </main>       
          : <div className={classes.root}>
                <CircularProgress />
            </div> }
        </div>
      </Router>
  );
}

export default App;
