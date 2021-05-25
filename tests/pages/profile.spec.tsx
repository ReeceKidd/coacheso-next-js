import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/profile'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockResolvedValue({ username: 'user' }),
}))

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
