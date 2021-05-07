import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Coach } from 'lib/graphql/Coaches.graphql'

interface Props {
  coaches: Coach[]
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    maxWidth: '26rem',
  },
  cardMedia: {
    width: 160,
  },
}))

export default function Posts(props: Props): JSX.Element {
  const styles = useStyles()
  const { coaches } = props

  return (
    <Grid container className={styles.container} spacing={4}>
      {coaches.map((coach) => (
        <Grid item key={coach._id} xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card className={styles.card}>
              <div className={styles.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5" className={styles.cardText}>
                    {coach.name}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  )
}
