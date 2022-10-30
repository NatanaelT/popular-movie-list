import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, LinearProgress, Box, Grid, makeStyles, Stack } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { fontWeight, maxWidth } from "@mui/system";
import { IMovie } from "./MovieType";
import { getColorValueBased } from "../../../utils/getColorValueBased";
import { removeFavorite, selectFavorites, setFavorites } from "../../../store/slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

interface MovieCardProps {
    movie: IMovie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { title, poster_path, vote_average, id } = movie

    const router = useRouter();
    const dispatch = useDispatch()
    const favoriteMovies = useSelector(selectFavorites);
    const isFavorite = favoriteMovies.findIndex((movie) => movie.id === id);

    const getMoviePosterUrl = (img_path: string) => `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${img_path}`
    const normalise = (value: number) => ((value - 0) * 100) / (10 - 0);

    return (
        <Card sx={{ '&:hover': { cursor: 'pointer' } }}>
            <div style={{ position: 'relative' }}>
                <a onClick={() => router.push(`/movie?id=${id}`)} target="_blank">
                    <CardMedia
                        component="img"
                        image={getMoviePosterUrl(poster_path)}
                        alt={title}
                    />
                </a>
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} aria-label="add to favorites">
                    {isFavorite === -1 ?
                        <FavoriteBorderIcon onClick={() => dispatch(setFavorites({ id: movie.id, title: movie.title }))} sx={{ color: 'white' }} /> :
                        <FavoriteIcon onClick={() => dispatch(removeFavorite(movie.id))} sx={{ color: 'palevioletred' }} />
                    }
                </IconButton>
            </div>
            <Box sx={{ width: '100%', color: getColorValueBased(vote_average, 5, 7) }}>
                <LinearProgress variant="determinate" color="inherit" value={normalise(vote_average)} />
            </Box>
            <p style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 'bold',
                padding: '5px'
            }}>
                {title}
            </p>
        </Card >
    )
}