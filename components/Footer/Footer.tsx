import { Box, Container, Typography } from '@material-ui/core'
import React from 'react'

export interface FooterProps {
  darkState: boolean
}

export default function Footer({ darkState }: FooterProps): JSX.Element {
  return (
    <footer>
      <Box
        style={{
          backgroundColor: darkState ? '#FFF' : '#424242',
          color: darkState ? '#000' : '#FFF',
          bottom: 0,
          width: '100%',
        }}
      >
        <Container>
          <Box pt={12} pb={12} style={{ textAlign: 'center' }}>
            <Typography>Coacheso &reg; {new Date().getFullYear()}</Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}
