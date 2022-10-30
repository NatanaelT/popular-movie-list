import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMoviesSearch(pageNumber: number) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movies, setMovies] = useState<any>([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel: any
    axios({
      method: 'GET',
      url: '/api/movie',
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {

      setMovies((prevMovies: any) => {
        return [...new Set([...prevMovies, ...res.data.data.results])]
      })
      setHasMore(res.data.total_result !== movies.length)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, movies, hasMore }
}