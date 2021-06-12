import React from 'react'
import renderer from 'react-test-renderer'

import Landing from '../../pages/landing'

jest.mock('../../components/Metadata/Metadata', () => () => 'Metadata')
jest.mock('../../components/SkillsSearchBlock/SkillsSearchBlock', () => () => 'SkillsSearchBlock')
jest.mock('../../components/MiddleContentBlock/MiddleContentBlock', () => () =>
  'MiddleContentBlock'
)
jest.mock('../../components/LeftContentBlock/LeftContentBlock', () => () => 'LeftContentBlock')
jest.mock('../../components/RightContentBlock/RightContentBlock', () => () => 'RightContentBlock')

describe('Landing', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<Landing />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<Landing />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
