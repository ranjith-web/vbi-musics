import { setCache } from '../../service/appServices';
import _ from 'lodash';
import moment from 'moment';

const initialState = [];

const deleteTracks = (payload, state) => {
    const { playlists } = state;
    const { albumName } = payload;
    const idx = _.findIndex(playlists, (o) => o.name === albumName );
    const _tracks = [...playlists[idx].tracks];
    const trackIdx = _.findIndex(playlists[idx].tracks, (x) => x.albumId === payload.albumId && x.id === payload.id );
    
    _tracks.splice(trackIdx, 1);
    playlists[idx] = {
        ...playlists[idx],
        tracks: [ ..._tracks]
    }
    setCache("Playlists", playlists);
    return playlists;
}
const playlists = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        // Set data to playlist to localstorage and serves to redux state
        case 'LOAD_PLAYLISTS':
            return {
                ...state,
                playlists: [...payload]
            };
        // Adding new playlist 
        case 'ADD_PLAYLISTS':
            const { playlists } = state;
            const _playlists = Object.assign([], playlists);
            payload.uid = playlists.length + 1;
            _playlists.push(payload);
            // Uppdate Playlists localstorage with newly added playlists state
            setCache("Playlists", _playlists);
            return {
                ...state,
                playlists: [..._playlists]
            }
        case 'ADD_TRACKS':
            const { albumName, ...rest } = payload;
            // Clone the playlist state to _ps, hence should not mutate redux state directly.
            const _ps = Object.assign([], state.playlists);
            const idx = _.findIndex(_ps, (o) => o.name === albumName );
            // To find newly added tracks is already exists in current playlist
            const isAlreadyExists = _ps[idx].tracks.filter(x => x.albumId === payload.albumId && x.id === payload.id );
        
            if(isAlreadyExists.length === 0){
                const cdt = moment().format('DD/MMM/YYYY h:mm:ss');    
                let _songs = {
                    ...rest,
                    createdAt: cdt                        
                }
                _ps[idx] = {
                    ..._ps[idx],
                    tracks: [ ..._ps[idx].tracks.concat(_songs)]
                }

                setCache("Playlists", _ps);
            }
            return {
                ...state,
                playlists: [..._ps]
            }
        case 'DELETE_TRACKS':
            const ps = deleteTracks(payload, state);
            return {
                ...state,
                playlists: [...ps]
            }
        default:
            return state
    }
}
  
export default playlists;