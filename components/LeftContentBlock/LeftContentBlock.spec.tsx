import React from 'react'
import renderer from 'react-test-renderer'

import LeftContentBlock, {
  LeftContentBlockProps,
} from '../../components/LeftContentBlock/LeftContentBlock'

describe('LeftContentBlock', () => {
  let mockProps: LeftContentBlockProps
  beforeEach(() => {
    mockProps = {
      title: 'Find a coach',
      content: 'Coaches available anywhere',
      icon: 'product.svg',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <LeftContentBlock
            title={mockProps.title}
            content={mockProps.content}
            icon={mockProps.icon}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <LeftContentBlock
          title={mockProps.title}
          content={mockProps.content}
          icon={mockProps.icon}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
