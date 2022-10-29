import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, CircularProgress, TextField, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import useDebounce from '../../hooks/useDebounce';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';

export default function Navbar() {
  const [search, setSearch] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<readonly any[]>([]);

  React.useEffect(() => {
    setOptions([]);
  }, [open]);

  const debouncedSearch = useDebounce(search ?? '', 500);

  React.useEffect(() => {
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  async function fetchData() {
    setLoading(true);
    setOptions([]);

    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6738e24c66b1eaa9f4403bb9474e3670&language=pt-BR&page=1&include_adult=true&query=${debouncedSearch}`
    ).then((res) => res.json()).finally(() => setLoading(false));
    setOptions(data.results)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Button onClick={() => window.location.href = '/'} sx={{ color: '#fff', backgroundColor: '#3b8ad9' }}>
            Home
          </Button>
            <Autocomplete
              id="asynchronous-demo"
              noOptionsText={search ? 'Nenhum resultado encontrado' : 'Digite para pesquisar'}
              size='small'
              sx={{ width: 300, marginLeft: '10px',}}
              open={open}
              onChange={(event, newValue) => {
                if (newValue) window.location.href = `/movie?id=${newValue.id}`
                setSearch(null)
              }}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionLabel={(option) => option.title}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  sx={{ '&.MuiTextField-root': { backgroundColor: '#3b8ad9', borderRadius: '4px'} }}
                  {...params}
                  placeholder="Pesquisar"
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <SearchIcon sx={{ color: 'white' }}/>
                    ),
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
