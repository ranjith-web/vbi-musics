import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useSongsSearch(query, pageNumber, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [songs, setSongs] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [noDataFound, setNoDataFound] = useState(false)

  useEffect(() => {
    setSongs([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/photos',
      params: { q: query, page: pageNumber, _limit: limit },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setSongs(prevSongs => {
            return [...res.data]
        });
        if( limit <= res.data.length ){
            setHasMore(res.data.length > 0);
        } else {
            setHasMore(false);
        }
        setLoading(false);
        if( res.data.length === 0 ){
            setNoDataFound(true);
        } else {
            setNoDataFound(false);
        }
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber, limit])

  return { loading, error, songs, hasMore, noDataFound }
}