import React from 'react'
import renderer from 'react-test-renderer'

import Header, { HeaderProps } from '../../components/Header/Header'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { activity: 'tennis' } })),
}))
jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockResolvedValue({ username: 'user' }),
}))

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
