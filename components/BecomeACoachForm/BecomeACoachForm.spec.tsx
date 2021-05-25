import React from 'react'
import renderer from 'react-test-renderer'

import {
  BecomeACoachForm,
  BecomeACoachFormProps,
} from '../../components/BecomeACoachForm/BecomeACoachForm'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { activity: 'tennis' } })),
}))
jest.mock('../../lib/graphql/Coaches.graphql', () => ({
  useCoachesQuery: jest.fn(() => ({
    data: { name: 'Coach', email: 'test@gmail.com' },
    loading: false,
  })),
}))

describe('BecomeACoachForm', () => {
  let mockProps: BecomeACoachFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(<BecomeACoachForm onSubmit={mockProps.onSubmit} />)
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<BecomeACoachForm onSubmit={mockProps.onSubmit} />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
