import { Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import { Crypto } from '../../context/CryptoContext'
import MuiAlert from '@mui/material/Alert';

const Alert = () => {
  const { alert, setAlert } = useContext(Crypto)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}>{alert.message}</MuiAlert>
    </Snackbar>
  )
}

export default Alert