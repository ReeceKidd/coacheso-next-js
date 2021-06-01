import React from 'react'
import renderer from 'react-test-renderer'

import CoachUsername from '../../../pages/coaches/[username]'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { username: 'reecekidd' } })),
}))
jest.mock('../../../lib/graphql/Coach.graphql', () => ({
  useCoachQuery: jest.fn(() => ({
    data: {
      coach: {
        name: 'Reece Kidd',
        username: 'reecekidd',
        picture:
          'https://lh3.googleusercontent.com/a-/AOh14GhoDg_ewwIbsb4vMRZ_-i2CjiiiWCxd09V1RTV1Aw=s96-c',
        title: 'Tennis coach',
        description: 'Experienced tennis  coach',
        skills: [{ skill: 'tennis' }],
      },
    },
    loading: false,
  })),
}))

describe('CoachUsername', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<CoachUsername />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<CoachUsername />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
