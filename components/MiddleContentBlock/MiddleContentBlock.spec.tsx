import React from 'react'
import renderer from 'react-test-renderer'

import MiddleContentBlock, {
  MiddleContentBlockProps,
} from '../../components/MiddleContentBlock/MiddleContentBlock'

describe('MiddleContentBlock', () => {
  let mockProps: MiddleContentBlockProps
  beforeEach(() => {
    mockProps = {
      title: 'Find a coach',
      content: 'Coaches available anywhere',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(<MiddleContentBlock title={mockProps.title} content={mockProps.content} />)
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <MiddleContentBlock title={mockProps.title} content={mockProps.content} />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
