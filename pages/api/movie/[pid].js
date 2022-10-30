import axios from 'axios';

export default async (req, res) => {
  const { pid } = req.query;
  const URL = `https://api.themoviedb.org/3/movie/${pid}?api_key=${process.env.API_KEY}&language=pt-BR`;
  const response = await axios({
    method: 'GET',
    url: URL,
  });
  res.status(200).json(response.data);
};
