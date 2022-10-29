import { useRouter } from "next/router";
import { MovieDetails } from "../../src/components/Movies/MovieDetails";

export default function Movie() {
    const router = useRouter();
    const queryParams = router.query;
    const id: number = queryParams?.id ? Number(queryParams.id) : 0;

    return (
        <>
            {id &&
                <MovieDetails id={id} />
            }
        </>
    )
}
