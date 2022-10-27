import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMoviesSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movies, setMovies] = useState<any>([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setMovies([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel: any
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=6738e24c66b1eaa9f4403bb9474e3670&language=pt-BR&sort_by=popularity.desc?`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setMovies((prevMovies: any) => {
        return [...new Set([...prevMovies, ...res.data.results])]
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