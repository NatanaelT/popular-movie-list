import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { MovieCard } from './MovieCard';

export const MovieList: React.FC = () => {
    const [movies, setMovies] = useState([])

    React.useEffect(() => { getMovies() }, [])

    const getMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6738e24c66b1eaa9f4403bb9474e3670&language=pt-BR&page=1&sort_by=popularity.desc?`);
            console.log(response);
            setMovies(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Grid sx={{ width: '50%', marginLeft: '25%', marginTop: 2, marginBottom: 2 }} justifyContent="center" container spacing={2}>
            {movies.map(({ title, vote_average, poster_path }) => {
                return (
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <MovieCard title={title} vote_average={vote_average} poster_path={poster_path} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
