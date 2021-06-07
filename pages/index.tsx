import React from 'react'
import { Container } from '@material-ui/core'

import SkillsSearchBlock from '../components/SkillsSearchBlock/SkillsSearchBlock'
import MiddleContentBlock from '../components/MiddleContentBlock/MiddleContentBlock'
import LeftContentBlock from '../components/LeftContentBlock/LeftContentBlock'
import RightContentBlock from '../components/RightContentBlock/RightContentBlock'

export default function Index(): JSX.Element {
  return (
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
      <LeftContentBlock
        title={'Get detailed feedback'}
        content={'Find out what you are doing right, wrong and what you need to work on'}
        icon={'notes.svg'}
      />
      <RightContentBlock
        title={'Get a plan'}
        content={'Get a customized plan to take you to the next level'}
        icon={'graphs.svg'}
      />
      <LeftContentBlock
        title={'Lessons anywhere'}
        content={'Takes lessons anytime anyplace'}
        icon={'waving.svg'}
      />
      <RightContentBlock
        title={'Coaching for all skills'}
        content={'From programming to tennis find a coach for all of your interests'}
        icon={'developer.svg'}
      />
    </Container>
  )
}
