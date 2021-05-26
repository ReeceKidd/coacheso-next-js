import React from 'react'
import renderer from 'react-test-renderer'

import CoachingProfile from '../../pages/coaching-profile'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockResolvedValue({ username: 'user' }),
}))

describe('CoachingProfile', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachingProfile />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachingProfile />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
