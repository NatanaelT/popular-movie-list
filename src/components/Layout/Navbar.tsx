import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Badge, Button, CircularProgress, Divider, IconButton, Menu, MenuItem, TextField, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../../store/slices/favoritesSlice';
import useDebounce from '../../hooks/useDebounce';
import { IMovie } from '../Movies/MovieType';

export default function Navbar() {
  const [search, setSearch] = React.useState<string | null>(null);
  const [openAutocomplete, setOpenAutocomplete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<readonly any[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const favoriteMovies = useSelector(selectFavorites);
  const router = useRouter();
  const openFavorites = Boolean(anchorEl);
  const debouncedSearch = useDebounce(search ?? '', 500);
  const matches = useMediaQuery('(min-width:600px)');


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setOptions([]);
  }, [openAutocomplete]);


  React.useEffect(() => {
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const fetchData = async () => {
    setLoading(true);
    setOptions([]);

    axios({
      method: 'GET',
      url: '/api/search',
      params: { q: debouncedSearch },
    }).then((res) => setOptions(res.data.results)).catch((error) => console.log('error', error)).finally(() => setLoading(false));
  }

  const handleOnChange = (event: React.ChangeEvent<{}>, newValue: IMovie | null) => {
    if (newValue) router.push(`/movie?id=${newValue?.id}`)
    setSearch(null)
    setValue(null)
    setInputValue('')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ maxHeight: '56px' }}>
        <Toolbar>
          <Button onClick={() => router.push('/')} sx={{ color: '#fff', backgroundColor: '#3b8ad9' }}>
            Início
          </Button>

          <Box sx={{ flexGrow: 1 }}>
            <Autocomplete
              id="asynchronous-movies-search"
              noOptionsText={search ? 'Nenhum resultado encontrado' : 'Digite para pesquisar'}
              size='small'
              sx={{ width: matches ? '450px' : '200px', marginLeft: '10px', }}
              value={value}
              inputValue={inputValue}
              open={openAutocomplete}
              onChange={(event, newValue) => handleOnChange(event, newValue)}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              onOpen={() => setOpenAutocomplete(true)}
              onClose={() => setOpenAutocomplete(false)}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.title}
                  </li>
                );
              }}
              clearOnBlur
              clearOnEscape
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  sx={{ '&.MuiTextField-root': { backgroundColor: '#3b8ad9', borderRadius: '4px' } }}
                  {...params}
                  placeholder="Pesquisar"
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <SearchIcon sx={{ color: 'white' }} />
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
          </Box>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openFavorites ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFavorites ? 'true' : undefined}
          >
            <Badge badgeContent={favoriteMovies.length} sx={{ color: 'white' }}>
              <FavoriteIcon sx={{ color: 'white' }} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openFavorites}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {favoriteMovies.map((movie, index) => (
              <div key={movie.id}>
                <MenuItem onClick={() => router.push(`/movie?id=${movie.id}`)} >
                  {movie.title}
                </MenuItem>
                {index === favoriteMovies.length - 1 ? null : <Divider />}
              </div>
            ))}
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
