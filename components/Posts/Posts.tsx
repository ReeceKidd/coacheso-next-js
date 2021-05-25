import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Coach } from 'lib/graphql/Coaches.graphql'
import { CardMedia } from '@material-ui/core'
import { useRouter } from 'next/router'

export interface PostsProps {
  coaches: Coach[]
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  cardActionArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMedia: {
    width: 50,
    height: 50,
  },
}))

export default function Posts(props: PostsProps): JSX.Element {
  const styles = useStyles()
  const router = useRouter()
  const { coaches } = props

  return (
    <Grid container className={styles.container} spacing={4}>
      {coaches.map((coach) => (
        <Grid item key={coach._id} xs={12} md={3}>
          <Card
            onClick={() => {
              router.push(`/coaches/${coach._id}`)
            }}
          >
            <CardActionArea className={styles.cardActionArea}>
              {coach.profilePicture && (
                <CardMedia
                  image={coach.profilePicture}
                  title="Profile picture"
                  className={styles.cardMedia}
                />
              )}
              <CardContent>
                <Typography component="h2" variant="h5">
                  {coach.name}
                </Typography>
                <Typography component="p" variant="body1" color="textSecondary">
                  {coach.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
