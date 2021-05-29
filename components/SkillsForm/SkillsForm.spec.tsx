import React from 'react'
import renderer from 'react-test-renderer'

import { SkillsForm, SkillsFormProps } from './SkillsForm'

describe('SkillsForm', () => {
  let mockProps: SkillsFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
      setShowSkillsForm: jest.fn(),
      setSkills: jest.fn(),
      showSkillsForm: false,
      skill: 'Tennis',
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <SkillsForm
            onSubmit={mockProps.onSubmit}
            setShowSkillsForm={mockProps.setShowSkillsForm}
            setSkills={mockProps.setSkills}
            showSkillsForm={mockProps.showSkillsForm}
            skill={mockProps.skill}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <SkillsForm
          onSubmit={mockProps.onSubmit}
          setShowSkillsForm={mockProps.setShowSkillsForm}
          setSkills={mockProps.setSkills}
          showSkillsForm={mockProps.showSkillsForm}
          skill={mockProps.skill}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
