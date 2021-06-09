import React from 'react'
import { Container } from '@material-ui/core'

import Metadata from '../components/Metadata/Metadata'
import MiddleContentBlock from '../components/MiddleContentBlock/MiddleContentBlock'
import LeftContentBlock from '../components/LeftContentBlock/LeftContentBlock'
import RightContentBlock from '../components/RightContentBlock/RightContentBlock'

export default function BecomeACoach(): JSX.Element {
  return (
    <Container>
      <Metadata
        title="Become a coach - start coaching earn money and share your skills"
        description="Share your skills to help others improve rapidly. Work with motivated people and earn money in the process."
      />

      <RightContentBlock
        title={'Become a coach'}
        content={
          'Share your skills. Help others improve rapidly. Work with motivated people and earn money in the process.'
        }
        icon={'process-outline.svg'}
      />
      <LeftContentBlock
        title={'Students find you'}
        content={
          'No need to market your services. Students can find you using our matching service.'
        }
        icon={'search-outline.svg'}
      />
      <MiddleContentBlock
        title={'How it works'}
        content={
          'Students apply to get coaching. You accept if they are a good fit. You start giving coaching sessions.'
        }
      />
      <LeftContentBlock
        title={'Full control of your sessions'}
        content={'Plan and teach your sessions as you see fit.'}
        icon={'graphs.svg'}
      />
      <RightContentBlock
        title={'Lessons anywhere'}
        content={'You can host your sessions in person or online'}
        icon={'waving.svg'}
      />
      <LeftContentBlock
        title={'Work whenever you want'}
        content={'You choose your own schedule'}
        icon={'developer.svg'}
      />
    </Container>
  )
}
