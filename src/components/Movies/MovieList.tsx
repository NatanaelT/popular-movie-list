import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import useMoviesSearch from '../../hooks/useMoviesSearch';
import { MovieCard } from './MovieCard';
import { IMovie } from './MovieType';

export const MovieList: React.FC = () => {
    const [pageNumber, setPageNumber] = useState(1)

    const {
        movies,
        hasMore,
        loading,
    } = useMoviesSearch(pageNumber)

    const observer = useRef<any>()
    const lastMovieElementRef = useCallback((node: HTMLElement | null) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <Grid sx={{ width: '50%', marginLeft: '25%', marginTop: 2, marginBottom: 5 }} justifyContent="center" container spacing={2}>
            {movies.map((movie: IMovie, index: number) => {
                if (movies.length !== index + 1) {
                    return (
                        <Grid key={`last_${movie.id}`} ref={lastMovieElementRef} item xs={12} md={6} lg={4} xl={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    )
                } else {
                    return (
                        <Grid key={movie.id} item xs={12} md={6} lg={4} xl={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    )
                }
            })}
            {loading && <Box><CircularProgress /></Box>}
        </Grid >
    )
}
