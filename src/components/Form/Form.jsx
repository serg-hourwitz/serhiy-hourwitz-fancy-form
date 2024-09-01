import { useState, useEffect } from 'react';
import MyAvatar from '../Avatar/Avatar';
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
import axios from 'axios';
import TokenIcons from '../TokenIcons/TokenIcons';
import CircularWithValueLabel from '../Progress/Progress';

const SwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [inputToken, setInputToken] = useState('');
  const [outputToken, setOutputToken] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://interview.switcheo.com/prices.json')
      .then((response) => {
        console.log('API Response:', response.data);

        const availableTokens = response.data
          .map((tokenData) => {
            const symbol = tokenData?.currency || tokenData?.symbol;
            const price = tokenData?.price || tokenData?.USD;

            return price ? { symbol, price } : null;
          })
          .filter((token) => token !== null);

        console.log('Available Tokens:', availableTokens);
        setTokens(availableTokens);
      })
      .catch((error) => {
        console.error('Error fetching token prices:', error);
        setError('Failed to fetch token prices');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSwap = () => {
    if (!inputToken || !outputToken || !inputAmount) {
      setError('Please fill in all fields');
      return;
    }

    if (inputAmount < 0) {
      setError('Amount to send cannot be less than 0');
      return;
    }

    if (inputToken === outputToken) {
      setError('Select different tokens to swap');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const inputTokenPrice =
        tokens.find((token) => token.symbol === inputToken)?.price || 0;
      const outputTokenPrice =
        tokens.find((token) => token.symbol === outputToken)?.price || 0;

      const outputValue = (inputAmount * inputTokenPrice) / outputTokenPrice;
      setOutputAmount(outputValue.toFixed(2));
      setError('');
      setSuccessMessage('Swap confirmed successfully!');
      setSubmitting(false);
    }, 2000);
  };

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
        width: 400,
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
        }}
      >
        Swap Form
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

      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2, fontFamily: 'Montserrat', fontWeight: 600 }}
        >
          {successMessage}
        </Alert>
      )}

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
