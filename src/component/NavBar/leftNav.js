import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => (
  <ul className="left">
    <li className="logo">
      <Link to="/allsongs">VBI Musics</Link>
    </li>

    <li>
      <Link to="/playlists">Playlists</Link>
    </li>
  </ul>
);

export default LeftNav;
