import React from 'react'
import renderer from 'react-test-renderer'

import Footer, { FooterProps } from '../../components/Footer/Footer'

describe('Footer', () => {
  let mockProps: FooterProps
  beforeEach(() => {
    mockProps = {
      darkState: false,
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<Footer darkState={mockProps.darkState} />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<Footer darkState={mockProps.darkState} />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
