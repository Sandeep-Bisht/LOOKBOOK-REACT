import React from 'react'
// ** MUI Components
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '90vw'
    }
  }))

  const Img = styled('img')(({ theme }) => ({
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('lg')]: {
      height: 450,
      marginTop: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
      height: 400
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(13)
    }
  }))


const NoDataFound = () => {
    
  return (<Box className='content-center'>
  <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <BoxWrapper>
        <Img height='487' alt='no-data-found' src='/images/errors/no-data-found.png' />
      <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
        No Data Found ⚠️
      </Typography>
      <Typography variant='body2'>We couldn&prime;t find any data you are looking for.</Typography>
    </BoxWrapper>
  </Box>
</Box>
  )
}

export default NoDataFound