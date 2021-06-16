import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Coach } from 'lib/graphql/Coaches.graphql'
import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'

export interface UserCardsProps {
  coaches: Coach[]
}

const useStyles = makeStyles((theme: Theme) => ({
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    marginTop: 10,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

export default function UserCards(props: UserCardsProps): JSX.Element {
  const styles = useStyles()
  const router = useRouter()
  const { coaches } = props

  return (
    <Grid container spacing={4}>
      {coaches.map((coach) => (
        <Grid item key={coach._id} xs={12} md={12}>
          <Card
            onClick={() => {
              router.push(`/coaches/${coach.username}`)
            }}
          >
            <CardActionArea className={styles.cardActionArea}>
              {coach.picture && (
                <Avatar alt={coach.name} src={coach.picture} className={styles.large} />
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
