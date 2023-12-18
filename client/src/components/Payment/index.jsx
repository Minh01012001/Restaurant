import { Box, Button, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Detail = ({ name, price }) => {
  return <Stack direction="row" justifyContent="space-between" px={2} my={1}>
    <Typography variant='body1' >{name}</Typography>
    <Typography variant='body1' >{price}</Typography>
  </Stack>
}

const PaymentPage = () => {
  const items = [{
    id: 1,
    name: 'Item 1',
    price: 0
  },
  {
    id: 2,
    name: 'Item 2',
    price: 0
  }]

  return (
    <Container maxWidth="sm" >
      <Typography variant='h3' py={3}>Payment</Typography>
      <Card sx={{ padding: 3 }} elevation={5}>
        <Grid container spacing={4} >
          <Grid item xs={12}>
            <Typography variant='h6' fontWeight="bold">Order Summary</Typography>
            <Stack direction="row" justifyContent="space-between" px={2}>
              <Typography variant='body1' fontWeight="bold">Name</Typography>
              <Typography variant='body1' fontWeight="bold">Price</Typography>
            </Stack>
            <Divider sx={{ backgroundColor: "black", margin: "8px 8px" }} />
            {items.map(item => <Detail name={item.name} price={item.price} key={item.id} />)}
            <Divider sx={{ backgroundColor: "black", margin: "90px 8px 8px 8px" }} />
            <Stack direction="row" justifyContent="space-between" px={2}>
              <Typography variant='body1' fontWeight="bold">Total</Typography>
              <Typography variant='body1' fontWeight="bold">Price: 0</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="column" gap={2}>
            <Typography variant='h6' fontWeight="bold">Payment method</Typography>

            <RadioGroup
              row
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="visa" control={<Radio />} label="Visa" />
              <FormControlLabel value="master card" control={<Radio />} label="Master card" />

            </RadioGroup>
            <Button variant='contained' >Confirm</Button>
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ height: 50 }}></Box>
    </Container>
  )
}

export default PaymentPage