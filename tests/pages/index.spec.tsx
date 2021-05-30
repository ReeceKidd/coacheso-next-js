import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/index'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockResolvedValue({ username: 'user' }),
}))
jest.mock('../../lib/graphql/CurrentUser.graphql', () => ({
  useCurrentUserQuery: jest.fn().mockResolvedValue({ username: 'user' }),
}))
jest.mock('../../lib/graphql/Skills.graphql', () => ({
  useSkillsQuery: jest.fn().mockResolvedValue([{ skill: 'tennis' }]),
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
