import { Box, Typography } from '@material-ui/core'
import React from 'react'

export interface FooterProps {
  darkState: boolean
}

export default function Footer({ darkState }: FooterProps): JSX.Element {
  return (
    <footer>
      <Box
        style={{
          color: darkState ? '#FFF' : '#000',
          bottom: 0,
          width: '100%',
        }}
      >
        <Box pt={12} pb={12} style={{ textAlign: 'center' }}>
          <Typography>Coacheso &reg; {new Date().getFullYear()}</Typography>
        </Box>
      </Box>
    </footer>
  )
}
