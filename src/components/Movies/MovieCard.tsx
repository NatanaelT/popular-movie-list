import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, LinearProgress, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';

interface MovieCardProps {
    title: string;
    vote_average: number;
    poster_path: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ title, vote_average, poster_path }) => {

    const getMoviePosterUrl = (img_path: string) => {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${img_path}`
    }

    const normalise = (value: number) => ((value - 0) * 100) / (10 - 0);

    const getColor = (value: number) => {
        if (value <= 5)
            return '#E53A3A'
        if (value < 7)
            return '#F9A51A'
        if (value >= 7)
            return '#0B9764'
    }

    return (
        <Card>
            <CardMedia
                component="img"
                image={getMoviePosterUrl(poster_path)}
                alt={title}
            />
            <Box sx={{ width: '100%', color: getColor(vote_average) }}>
                <LinearProgress variant="determinate" color="inherit" value={normalise(vote_average)} />
            </Box>
            <CardContent sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'clip',
            }}>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="see movie details">
                    <AddIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}