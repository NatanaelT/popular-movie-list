import { Box, Paper, Grid, Typography, CircularProgress, CircularProgressProps } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IMovieDetails } from './MovieType'
import style from './MovieDetail.module.css';
import StarIcon from '@mui/icons-material/Star';
import { Layout } from '../Layout/Layout';

interface MovieDetailsProps {
    id: number
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
    const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        setCarregando(true)
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6738e24c66b1eaa9f4403bb9474e3670&language=pt-BR`).then((res) => {
            console.log('res', res.data)
            setMovie(res.data)
        }).finally(() => setCarregando(false))
    }

    return (
        carregando ? <p>carregando</p> :
            <Layout title={movie.title}>
                <Box sx={{ margin: 'auto', justifyContent: 'center', backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}), linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.5) 51%, rgba(0,0,0,1) 100%)`, backgroundBlendMode: 'overlay' }}>
                    <div className={style.productContainer}>
                        <div>
                            <img className={style.moviePoster} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <h1 style={{ textAlign: 'center' }}>{movie?.title}</h1>
                            <h2 style={{ textAlign: 'center' }}>{movie?.tagline}</h2>
                            <h2>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon sx={{ fontSize: '35px', color: 'rgb(245, 197, 24)' }} />{`${movie?.vote_average.toFixed(1)}/10`}
                                </span>
                            </h2>
                            <h3>Data de lançamento</h3>
                            <span>{movie?.release_date?.split("-").reverse().join("/")}</span>
                            {movie?.genres?.length > 0 && (
                                <div className={style.genreContainer}>
                                    <h3>Gênero</h3>
                                    {movie?.genres.map((genre) => (<span>{genre.name}</span>))}
                                </div>
                            )}
                            <h3>Sinopse</h3>
                            <p>{movie?.overview}</p>
                        </div>
                    </div>
                </Box>
            </Layout>
    )
}