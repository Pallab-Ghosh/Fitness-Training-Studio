import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function PaperCard() {
  return (
    <Box sx={{ display: 'flex',flexWrap: 'wrap','& > :not(style)': {
          marginLeft: 10,
          marginTop : 10,
          marginBottom:10,
          marginRight:10,
          width: 370,
          height: 128,
        },
      }}
    >

      <Paper elevation={24} />
      <Paper elevation={24} />
      <Paper elevation={24} />
    </Box>
  );
}
