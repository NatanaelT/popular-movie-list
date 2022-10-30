import { useRouter } from "next/router";
import { Layout } from "../../src/components/Layout/Layout";
import { MovieDetails } from "../../src/components/Movies/MovieDetails/MovieDetails";

export default function Movie() {
    const router = useRouter()
    const { pid } = router.query

    return (
        pid ? <MovieDetails id={pid} />
            : <p>Informe um filme válido</p>
    )
}
