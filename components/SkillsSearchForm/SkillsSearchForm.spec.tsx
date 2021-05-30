import React from 'react'
import renderer from 'react-test-renderer'

import { SkillsSearchForm, SkillsSearchFormProps } from './SkillsSearchForm'

describe('SkillsSearchForm', () => {
  let mockProps: SkillsSearchFormProps
  beforeEach(() => {
    mockProps = {
      skill: 'tennis',
      availableSkills: ['tennis'],
      setSkill: jest.fn(),
      onSubmit: jest.fn(),
    }
  })
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        renderer.create(
          <SkillsSearchForm
            onSubmit={mockProps.onSubmit}
            skill={mockProps.skill}
            availableSkills={mockProps.availableSkills}
            setSkill={mockProps.setSkill}
          />
        )
      ).not.toThrow()
    })

    it('should unmount without error', () => {
      const { unmount } = renderer.create(
        <SkillsSearchForm
          onSubmit={mockProps.onSubmit}
          skill={mockProps.skill}
          availableSkills={mockProps.availableSkills}
          setSkill={mockProps.setSkill}
        />
      )

      expect(() => unmount()).not.toThrow()
    })
  })
})
