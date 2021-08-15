import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';
  
  const SearchBar = ({handleKeyWord, hint}) => (
    <Box >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button sx={{ mx: 1 }}>
          Export
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder= {hint}
                variant="outlined"
                onChange={(e) => handleKeyWord(e)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
  
  export default SearchBar;
  