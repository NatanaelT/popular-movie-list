import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, LinearProgress, Box, Grid, makeStyles, Stack } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { fontWeight, maxWidth } from "@mui/system";
import { IMovie } from "./MovieType";
import { getColorValueBased } from "../../../utils/getColorValueBased";

interface MovieCardProps {
    movie: IMovie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { title, poster_path, vote_average, id } = movie

    const getMoviePosterUrl = (img_path: string) => `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${img_path}`
    const normalise = (value: number) => ((value - 0) * 100) / (10 - 0);

    return (
        <Card>
            <div style={{ position: 'relative' }}>
                <a href={`/movie?id=${id}`} target="_blank">
                    <CardMedia
                        component="img"
                        image={getMoviePosterUrl(poster_path)}
                        alt={title}
                    />
                </a>
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} aria-label="add to favorites">
                    <FavoriteBorderIcon sx={{ color: 'white' }} />
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