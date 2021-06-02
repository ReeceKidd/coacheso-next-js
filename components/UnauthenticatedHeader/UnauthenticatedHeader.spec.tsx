import React from 'react'
import renderer from 'react-test-renderer'

import UnauthenticatedHeader, {
  UnauthenticatedHeaderProps,
} from '../../components/UnauthenticatedHeader/UnauthenticatedHeader'

describe('UnauthenticatedHeader', () => {
  let mockProps: UnauthenticatedHeaderProps
  beforeEach(() => {
    mockProps = {
      darkState: false,
      handleThemeChange: jest.fn(),
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <UnauthenticatedHeader
            darkState={mockProps.darkState}
            handleThemeChange={mockProps.handleThemeChange}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <UnauthenticatedHeader
          darkState={mockProps.darkState}
          handleThemeChange={mockProps.handleThemeChange}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
