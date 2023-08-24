import { Box, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

export const Footer = () => {
  return (
    //footer section
    <Box mt="80px">
    <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px'}}}
     mt="41px" textAlign="center" pb="40px">Build Perfect Body With Clean Mind!!</Typography>
  </Box>
  )
}
