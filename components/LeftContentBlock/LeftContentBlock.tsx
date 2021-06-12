import { Box, Button, Grid, Typography } from '@material-ui/core'
import { Fade } from 'react-awesome-reveal'
import SvgIcon from '../SvgIcon/SvgIcon'

export interface LeftContentBlockProps {
  icon: string
  title: string
  content: string
  buttonText?: string
  onClick?: () => void
}

const LeftContentBlock = ({
  icon,
  title,
  content,
  buttonText,
  onClick,
}: LeftContentBlockProps): JSX.Element => {
  return (
    <Fade direction="left">
      <Box m={{ xs: 5, sm: 10, md: 20, lg: 30, xl: 40 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              {content}
            </Typography>
            {buttonText && (
              <Box
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                m={5}
              >
                <Button variant="contained" color="primary" onClick={onClick}>
                  {buttonText}
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

export default LeftContentBlock
