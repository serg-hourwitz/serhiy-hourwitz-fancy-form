/* Custom Components */
import MyAvatar from '../Avatar/Avatar';
import TokenIcons from '../TokenIcons/TokenIcons';
import CircularWithValueLabel from '../Progress/Progress';

/* React Imports */
import { useState, useEffect } from 'react';

/* MUI Components */ 
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Box,
  Alert,
  Tooltip,
} from '@mui/material';

/* Axios */ 
import axios from 'axios';


/* State Variable */
const SwapForm = () => {
  // Stores the list of available tokens fetched from the AP
  const [tokens, setTokens] = useState([]);
  // Store the selected tokens for swapping
  const [inputToken, setInputToken] = useState('');
  const [outputToken, setOutputToken] = useState('');
  // Store the input and calculated output amounts for the swap
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  // Stores error messages to display in the UI
  const [error, setError] = useState('');
  // A flag to show a loading indicator while fetching data
  const [loading, setLoading] = useState(false);
  // A flag to show a loading indicator during the swap process
  const [submitting, setSubmitting] = useState(false);
  // Stores a success message to display upon a successful swap
  const [successMessage, setSuccessMessage] = useState('');

  /* Current date and time variables */
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  /* useEffect fetches token prices from the provided API when the component mounts */
  useEffect(() => {
    // activates the loading state, and it's set to false once the data is fetched or an error occurs
    setLoading(true);
    // fetches the token prices
    axios
      .get('https://interview.switcheo.com/prices.json')
      .then((response) => {
        console.log('API Response:', response.data);

        const availableTokens = response.data
          .map((tokenData) => {
            // The response data is parsed to extract the symbol and price of each token
            const symbol = tokenData?.currency || tokenData?.symbol;
            const price = tokenData?.price || tokenData?.USD;

            return price ? { symbol, price } : null;
          })
          .filter((token) => token !== null);

        console.log('Available Tokens:', availableTokens);
        setTokens(availableTokens);
      })
      .catch((error) => {
        // If the API call fails, an error message is set using setError.
        console.error('Error fetching token prices:', error);
        setError('Failed to fetch token prices');
      })
      .finally(() => setLoading(false));
  }, []);

  /* Validation */
  const handleSwap = () => {
    // If all fields are filled
    if (!inputToken || !outputToken || !inputAmount) {
      setError('Please fill in all fields');
      return;
    }
    // If the selected tokens for input and output are different
    if (inputToken === outputToken) {
      setError('Select different tokens to swap');
      return;
    }

    // setSubmitting(true) is used to show a loading state during the swap process
    setSubmitting(true);

    // After a delay (simulating processing time), the output amount is calculated using the prices of the selected tokens.
    setTimeout(() => {
      const inputTokenPrice =
        tokens.find((token) => token.symbol === inputToken)?.price || 0;
      const outputTokenPrice =
        tokens.find((token) => token.symbol === outputToken)?.price || 0;

      const outputValue = (inputAmount * inputTokenPrice) / outputTokenPrice;
      setOutputAmount(outputValue.toFixed(2));
      // Displays success or error messages based on the validation and swap process.
      setError('');
      setSuccessMessage('Swap confirmed successfully!');
      setSubmitting(false);
    }, 2000);
  };

  // resets all input fields, error messages, and the success message to their initial state
  const handleReset = () => {
    setInputToken('');
    setOutputToken('');
    setInputAmount('');
    setOutputAmount('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontFamily={'Montserrat'}
        fontSize={'30px'}
        fontWeight={800}
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textShadow: '0 0 15px #ddd',
          textDecoration: 'underline',
        }}
      >
        Swap Form
        {/* avatar reserves the copyright to this form */}
        <MyAvatar />
      </Typography>

      <Typography
        variant="subtitle2"
        gutterBottom
        fontFamily={'Montserrat'}
        fontSize={12}
        fontWeight={500}
        sx={{ mb: 0 }}
      >
        {`Current Date: ${currentDate}`}
      </Typography>

      <Typography
        variant="subtitle2"
        gutterBottom
        fontFamily={'Montserrat'}
        fontSize={12}
        fontWeight={500}
        sx={{ mb: 2 }}
      >
        {`Current Time: ${currentTime}`}
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2, fontFamily: 'Montserrat', fontWeight: 600 }}
        >
          {error}
        </Alert>
      )}
      {/* Conditional rendering of error and success messages using Material-UI's Alert component */}
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2, fontFamily: 'Montserrat', fontWeight: 600 }}
        >
          {successMessage}
        </Alert>
      )}
      {/* If loading is true, a circular progress indicator is displayed */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularWithValueLabel />
        </Box>
      ) : (
        <Stack spacing={2}>
          <TextField
            sx={{
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              },
            }}
            fullWidth
            select
            label="From"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
          >
            {tokens.map((token) => (
              <MenuItem key={token.symbol} value={token.symbol}>
                <TokenIcons symbol={token.symbol} alt={token.symbol} />
                {`${token.symbol} (Rate: ${token.price})`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              },
            }}
            fullWidth
            select
            label="To"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
          >
            {tokens.map((token) => (
              <MenuItem key={token.symbol} value={token.symbol}>
                <TokenIcons symbol={token.symbol} alt={token.symbol} />
                {`${token.symbol} (Rate: ${token.price})`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
            }}
            fullWidth
            label="Amount to send"
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            InputProps={{
              inputProps: { min: 0 }, // Prevent negative values
            }}
          />

          <TextField
            sx={{
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Montserrat',
                fontWeight: 500,
              },
            }}
            fullWidth
            label="Amount to receive"
            value={outputAmount}
            InputProps={{
              readOnly: true,
            }}
          />

          <Stack spacing={2}>
            <Tooltip>
              <Button
                sx={{ fontFamily: 'Montserrat', fontWeight: 700 }}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSwap}
                disabled={submitting}
              >
                {submitting ? <CircularWithValueLabel /> : 'CONFIRM SWAP'}
              </Button>
            </Tooltip>

            <Button
              sx={{ fontFamily: 'Montserrat', fontWeight: 700 }}
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleReset}
            >
              RESET
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default SwapForm;
