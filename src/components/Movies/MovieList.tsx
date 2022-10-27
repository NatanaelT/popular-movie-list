import { Grid, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef, useCallback } from 'react'
import { MovieCard } from './MovieCard';
import useMoviesSearch from './useMoviesSearch';

interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const MovieList: React.FC = () => {
    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

    const {
        movies,
        hasMore,
        loading,
        error
    } = useMoviesSearch('', pageNumber)

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
            {movies.map(({ title, vote_average, poster_path }: IMovie, index: number) => {
                if (movies.length === index + 1) {
                    return (
                        <Grid key={title} ref={lastMovieElementRef} item xs={12} md={6} lg={4} xl={3}>
                            <MovieCard title={title} vote_average={vote_average} poster_path={poster_path} />
                        </Grid>
                    )
                } else {
                    return (
                        <Grid key={title} item xs={12} md={6} lg={4} xl={3}>
                            <MovieCard title={title} vote_average={vote_average} poster_path={poster_path} />
                        </Grid>
                    )
                }
            })}
            {loading && <Box><CircularProgress /></Box>}
        </Grid >
    )
}
