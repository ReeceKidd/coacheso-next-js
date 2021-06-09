import { Box, Button, Grid, Typography } from '@material-ui/core'
import { Fade } from 'react-awesome-reveal'
import SvgIcon from '../SvgIcon/SvgIcon'

export interface RightContentBlockProps {
  icon: string
  title: string
  content: string
  buttonText?: string
  onClick?: () => void
}

const RightContentBlock = ({
  icon,
  title,
  content,
  buttonText,
  onClick,
}: RightContentBlockProps): JSX.Element => {
  return (
    <Fade direction="right">
      <Box m={15} mb={25}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Grid>
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
        </Grid>
      </Box>
    </Fade>
  )
}

export default RightContentBlock
