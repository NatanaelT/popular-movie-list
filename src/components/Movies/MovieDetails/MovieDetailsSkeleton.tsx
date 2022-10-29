import { Grid, Skeleton } from '@mui/material';

export const MovieDetailsSkeleton = () => {
    return (
        <Grid container>
            <Grid item xs={12} lg={5}>
                <Skeleton variant="rectangular" width={300} height={450} />
            </Grid>
            <Grid item xs={12} lg={5}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <br />
                <Skeleton variant="text" />
                <br />
                <Skeleton variant="text" />
                <br />
                <Skeleton variant="text" height={200} />
            </Grid>
        </Grid>
    )
}
