import axios from 'axios';

export default async (req, res) => {
  const query = req.query.q;
  let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR&sort_by=popularity.desc?`;
  if (query)
    URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=pt-BR&page=1&include_adult=true&query=${query}`;
  const response = await axios({
    method: 'GET',
    url: URL,
  });
  res.status(200).json({ data: response.data });
};
