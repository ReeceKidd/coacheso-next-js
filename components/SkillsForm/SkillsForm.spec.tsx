import React from 'react'
import renderer from 'react-test-renderer'

import { SkillsForm, SkillsFormProps } from './SkillsForm'

describe('SkillsForm', () => {
  let mockProps: SkillsFormProps
  beforeEach(() => {
    mockProps = {
      onSubmit: jest.fn(),
      setShowSkillsForm: jest.fn(),
      setSkill: jest.fn(),
      showSkillsForm: false,
      skill: 'tennis',
      availableSkills: ['tennis'],
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <SkillsForm
            onSubmit={mockProps.onSubmit}
            setShowSkillsForm={mockProps.setShowSkillsForm}
            setSkill={mockProps.setSkill}
            showSkillsForm={mockProps.showSkillsForm}
            skill={mockProps.skill}
            availableSkills={mockProps.availableSkills}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <SkillsForm
          onSubmit={mockProps.onSubmit}
          setShowSkillsForm={mockProps.setShowSkillsForm}
          setSkill={mockProps.setSkill}
          showSkillsForm={mockProps.showSkillsForm}
          skill={mockProps.skill}
          availableSkills={mockProps.availableSkills}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
