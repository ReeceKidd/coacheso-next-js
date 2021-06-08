import React from 'react'
import { Container } from '@material-ui/core'

import { Metadata } from '../components/Metadata/Metadata'
import SkillsSearchBlock from '../components/SkillsSearchBlock/SkillsSearchBlock'
import MiddleContentBlock from '../components/MiddleContentBlock/MiddleContentBlock'
import LeftContentBlock from '../components/LeftContentBlock/LeftContentBlock'
import RightContentBlock from '../components/RightContentBlock/RightContentBlock'

export default function Index(): JSX.Element {
  return (
    <>
      <Metadata
        title="Coacheso - find your perfect coach"
        description="Coacheso helps you find a coach, identify your weaknesses and improve rapidly."
      />
      <Container>
        <SkillsSearchBlock
          title={'Improve rapidly with a coach'}
          content={'Find your perfect coach'}
          icon={'product-launch.svg'}
        />
        <MiddleContentBlock
          title={'How it works'}
          content={'Find a coach, book a lesson and start improving'}
        />
        <RightContentBlock
          title={'Get detailed feedback'}
          content={'Find out what you are doing right, wrong and what you need to work on'}
          icon={'notes.svg'}
        />
        <LeftContentBlock
          title={'Get a plan'}
          content={'Get a customized plan to take you to the next level'}
          icon={'graphs.svg'}
        />
        <RightContentBlock
          title={'Lessons anywhere'}
          content={'Takes lessons anytime anyplace'}
          icon={'waving.svg'}
        />
        <LeftContentBlock
          title={'Coaching for all skills'}
          content={'From programming to tennis find a coach for all of your interests'}
          icon={'developer.svg'}
        />
      </Container>
    </>
  )
}
