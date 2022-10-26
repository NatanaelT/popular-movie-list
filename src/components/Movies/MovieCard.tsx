import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, LinearProgress, Box, Grid, makeStyles, Stack } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { fontWeight, maxWidth } from "@mui/system";

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
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    image={getMoviePosterUrl(poster_path)}
                    alt={title}
                />
                <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} aria-label="add to favorites">
                    <FavoriteBorderIcon sx={{
                        color: 'white',
                        '.MuiIcon-colorPrimary': { color: 'succes' },
                        '.MuiIcon-colorSecondary': { color: 'red' },
                        '.MuiIcon-colorAction': { color: 'red' }
                    }} />
                </IconButton>
            </div>
            <Box sx={{ width: '100%', color: getColor(vote_average) }}>
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