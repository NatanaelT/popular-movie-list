import { Layout } from '../src/components/Layout/Layout';
import { MovieList } from '../src/components/Movies/MovieList';

export default function Home() {
  return (
    <Layout title={'Lista de filmes'}>
      <MovieList />
    </Layout>
  )
}
