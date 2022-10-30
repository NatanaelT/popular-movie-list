import axios from 'axios';

export default async (req, res) => {
  const page = req.query.page
  let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR&sort_by=popularity.desc?`;
  const response = await axios({
    method: 'GET',
    url: URL,
    params: { page }
  });
  res.status(200).json({ data: response.data });
};
