import { useState, useRef, useCallback } from 'react';
import SpinBounce from '../SpinBounce';
import TrackLists from '../TrackList';
import useSongsSearch from '../../hooks/useSongsSearch';
import Search from '../Search';
import { getCache } from '../../service/appServices';
import './styles.css';

const AllSongs = ({ mode, onAddToPlaylist }) => {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(10);
    const headerClass = ! mode ? 'stream-header' : 'mHide';
    const [albums] = useState(
        getCache('Albums') || []
    );
    const {
        songs,
        hasMore,
        loading,
        noDataFound,
        error
    } = useSongsSearch(query, pageNumber, limit);

    const observer = useRef();
    const lastSongElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLimit((prevState) => prevState + 10);
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const handleSearch = (text) => {
        setQuery(text);
        setPageNumber(1);
    }

    return(
        <main className="allsongs">
            <section className="stream">
                <ul className={headerClass}>
                    <li>
                        <h1>All Songs</h1>
                    </li>
                </ul>
                <Search onChange={handleSearch}/>
                {songs.length > 0 && songs.map((song, index) => {
                    if (songs.length === index + 1) {
                        return ( <div ref={lastSongElementRef} key={index}>
                            <TrackLists mode={mode} {...song} albumName={albums.filter(x => x.id === song.albumId)[0].title} onAddToPlaylist={onAddToPlaylist}/>
                        </div> )
                    } else {
                        return ( <div key={index}>
                            <TrackLists mode={mode} {...song} albumName={albums.filter(x => x.id === song.albumId)[0].title} onAddToPlaylist={onAddToPlaylist}/>
                        </div> )
                    }
                }) }
                {noDataFound && <div className="nodatafound"><h4>No Data Found</h4></div>}
                <div>{loading && 
                    <SpinBounce/>
                }</div>
                <div>{error && 'Error'}</div>  
            </section>
        </main>
    )
}
  
export default AllSongs;
