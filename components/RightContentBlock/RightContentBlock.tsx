import { Box, Grid, Typography } from '@material-ui/core'
import { Fade } from 'react-awesome-reveal'
import SvgIcon from '../SvgIcon/SvgIcon'

export interface RightContentBlockProps {
  icon: string
  title: string
  content: string
}

const RightContentBlock = ({ icon, title, content }: RightContentBlockProps): JSX.Element => {
  return (
    <Fade direction="right">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box m={15}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box m={15}>
            <Typography variant="h2" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              {content}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default RightContentBlock
