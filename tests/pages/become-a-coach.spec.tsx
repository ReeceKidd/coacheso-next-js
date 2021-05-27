import React from 'react'
import renderer from 'react-test-renderer'

import BecomeACoach from '../../pages/become-a-coach'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn(() => ({ username: 'user' })),
  withPageAuthRequired: jest.fn(() => true),
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(() => true) })),
}))
jest.mock('../../lib/graphql/BecomeCoach.graphql', () => ({
  useBecomeCoachMutation: jest.fn(() => [jest.fn(), { data: undefined }]),
}))

describe('BecomeACoach', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<BecomeACoach />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<BecomeACoach />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
