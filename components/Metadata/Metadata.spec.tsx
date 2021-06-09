import React from 'react'
import renderer from 'react-test-renderer'

import Metadata, { MetadataProps } from '../../components/Metadata/Metadata'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/' })),
}))

describe('Metadata', () => {
  let mockProps: MetadataProps
  beforeEach(() => {
    mockProps = {
      title: 'Find a coach',
      description: 'Coacheso helps you find a coach',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(<Metadata title={mockProps.title} description={mockProps.description} />)
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <Metadata title={mockProps.title} description={mockProps.description} />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
