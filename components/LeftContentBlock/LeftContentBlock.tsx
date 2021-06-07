import { Box, Grid, Typography } from '@material-ui/core'
import { Fade } from 'react-awesome-reveal'
import SvgIcon from '../SvgIcon/SvgIcon'

export interface LeftContentBlockProps {
  icon: string
  title: string
  content: string
}

const LeftContentBlock = ({ icon, title, content }: LeftContentBlockProps): JSX.Element => {
  return (
    <Fade direction="left">
      <Grid container>
        <Grid item xs={6}>
          <Box m={15}>
            <Typography variant="h2" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              {content}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box m={15}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Box>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default LeftContentBlock
