import React from 'react'
import renderer from 'react-test-renderer'

import { TitleForm, TitleFormProps } from '../../components/TitleForm/TitleForm'

describe('TitleForm', () => {
  let mockProps: TitleFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => renderer.create(<TitleForm onSubmit={mockProps.onSubmit} />)).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(<TitleForm onSubmit={mockProps.onSubmit} />)

      expect(() => unmount()).not.toThrow()
    })
  })
})
