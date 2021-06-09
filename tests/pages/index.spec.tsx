import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/index'

jest.mock('../../components/Metadata/Metadata', () => () => 'Metadata')
jest.mock('../../components/SkillsSearchBlock/SkillsSearchBlock', () => () => 'SkillsSearchBlock')
jest.mock('../../components/MiddleContentBlock/MiddleContentBlock', () => () =>
  'MiddleContentBlock'
)
jest.mock('../../components/LeftContentBlock/LeftContentBlock', () => () => 'LeftContentBlock')
jest.mock('../../components/RightContentBlock/RightContentBlock', () => () => 'RightContentBlock')

describe('App', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<App />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<App />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
