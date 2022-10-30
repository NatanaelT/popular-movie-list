import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../Layout/Layout';
import { IMovieDetails } from '../MovieType';
import style from './MovieDetails.module.css';
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton';

interface MovieDetailsProps {
    id: number
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
    const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        getInitialData()
    }, [id])

    const getInitialData = async () => {
        setCarregando(true)
        await axios.get(`/api/movie/${id}`).then((res) => {
            setMovie(res.data.data)
        }).catch((error) => console.log('error', error)).finally(() => setCarregando(false))
    }

    return (
        <Layout title={movie.title}>
            <Box className={style.movieWrapper} sx={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}),linear-gradient(90deg,rgba(2, 0, 36, 1) 0%,rgba(0, 0, 0, 0.5) 51%,rgba(0, 0, 0, 1) 100%)` }}>
                <div className={style.movieContainer}>
                    {carregando ? <MovieDetailsSkeleton /> : (
                        <>
                            <div>
                                <img className={style.moviePoster} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`} />
                            </div>
                            <div>
                                <h1 >{movie?.title}</h1>
                                <h2 >{movie?.tagline}</h2>
                                <h2 className={style.voteAverage}>
                                    <span>
                                        <StarIcon />{`${movie?.vote_average.toFixed(1)}/10`}
                                    </span>
                                </h2>
                                <h3>Data de lançamento</h3>
                                <span>{movie?.release_date?.split("-").reverse().join("/")}</span>
                                {movie?.genres?.length > 0 && (
                                    <div className={style.genreContainer}>
                                        <h3>Gênero</h3>
                                        {movie?.genres.map((genre) => (<span key={`${genre.id}`}>{genre.name}</span>))}
                                    </div>
                                )}
                                <h3>Sinopse</h3>
                                <p>{movie?.overview}</p>
                            </div>
                        </>
                    )}
                </div>
            </Box>
        </Layout>
    )
}