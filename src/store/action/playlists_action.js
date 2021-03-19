export const loadPlaylists = ( payload ) => {
    return {
      type: 'LOAD_PLAYLISTS',
      payload
    }
};

export const addPlaylists = ( playlist ) => {
    return {
      type: 'ADD_PLAYLISTS',
      payload: playlist
    }
};

export const addTracks = ( tracks ) => {
  return {
    type: 'ADD_TRACKS',
    payload: tracks
  }
};

export const deleteTracks = ( tracks ) => {
  return {
    type: 'DELETE_TRACKS',
    payload: tracks
  }
};
