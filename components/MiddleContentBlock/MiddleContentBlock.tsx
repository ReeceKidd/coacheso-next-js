import { Box, Grid, Typography } from '@material-ui/core'
import { Slide } from 'react-awesome-reveal'

export interface MiddleContentBlockProps {
  title: string
  content: string
}

const MiddleContentBlock = ({ title, content }: MiddleContentBlockProps): JSX.Element => {
  return (
    <Slide direction="up">
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: 'center',
          }}
        >
          <Box m={{ xs: 8, sm: 10 }}>
            <Typography variant="h2" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h4">
              {content}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Slide>
  )
}

export default MiddleContentBlock
