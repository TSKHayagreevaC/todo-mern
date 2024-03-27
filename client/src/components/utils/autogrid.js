import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TodosCards from '../todos/todosList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid({cards}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {cards.map(ele => 
        <Grid item xs>
          <Item>
            <TodosCards head={ele} />
          </Item>
        </Grid>
          )}
      </Grid>
    </Box>
  );
}