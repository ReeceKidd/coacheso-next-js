import React from 'react'
import renderer from 'react-test-renderer'

import {
  DescriptionForm,
  DescriptionFormProps,
} from '../../components/DescriptionForm/DescriptionForm'

describe('DescriptionForm', () => {
  let mockProps: DescriptionFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
      setShowDescriptionForm: jest.fn(),
      setDescription: jest.fn(),
      showDescriptionForm: false,
      description: 'Tennis coach',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <DescriptionForm
            onSubmit={mockProps.onSubmit}
            setShowDescriptionForm={mockProps.setShowDescriptionForm}
            setDescription={mockProps.setDescription}
            showDescriptionForm={mockProps.showDescriptionForm}
            description={mockProps.description}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <DescriptionForm
          onSubmit={mockProps.onSubmit}
          setShowDescriptionForm={mockProps.setShowDescriptionForm}
          setDescription={mockProps.setDescription}
          showDescriptionForm={mockProps.showDescriptionForm}
          description={mockProps.description}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
