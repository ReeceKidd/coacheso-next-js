import React from 'react'
import renderer from 'react-test-renderer'

import Header, { HeaderProps } from '../../components/Header/Header'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn(() => ({ name: 'Reece' })),
}))
jest.mock('../AuthenticatedHeader/AuthenticatedHeader', () => () => 'AuthenticatedHeader')
jest.mock('../UnauthenticatedHeader/UnauthenticatedHeader', () => () => 'UnauthenticatedHeader')

describe('Header', () => {
  let mockProps: HeaderProps
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
          <Header darkState={mockProps.darkState} handleThemeChange={mockProps.handleThemeChange} />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <Header darkState={mockProps.darkState} handleThemeChange={mockProps.handleThemeChange} />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
