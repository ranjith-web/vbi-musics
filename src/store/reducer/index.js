import { combineReducers } from 'redux';
import playlists from './playlistReducer';

const appReducers = combineReducers({
    playlists
});

export default appReducers;