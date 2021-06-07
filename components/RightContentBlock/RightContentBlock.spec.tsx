import React from 'react'
import renderer from 'react-test-renderer'

import RightContentBlock, {
  RightContentBlockProps,
} from '../../components/RightContentBlock/RightContentBlock'

describe('RightContentBlock', () => {
  let mockProps: RightContentBlockProps
  beforeEach(() => {
    mockProps = {
      title: 'Find a coach',
      content: 'Coaches available anywhere',
      icon: 'product-launch.svg',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <RightContentBlock
            title={mockProps.title}
            content={mockProps.content}
            icon={mockProps.icon}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <RightContentBlock
          title={mockProps.title}
          content={mockProps.content}
          icon={mockProps.icon}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
