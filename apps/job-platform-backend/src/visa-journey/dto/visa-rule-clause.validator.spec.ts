import { ValidationArguments } from 'class-validator';
import { VisaRuleClauseCompatibilityConstraint } from './visa-rule-clause.validator';

describe('VisaRuleClauseCompatibilityConstraint', () => {
  const validator = new VisaRuleClauseCompatibilityConstraint();
  const args = (object: object) => ({ object }) as ValidationArguments;

  it('accepts numeric comparisons only for numeric fields', () => {
    expect(
      validator.validate(18, args({ field: 'age', op: 'GTE', value: 18 })),
    ).toBe(true);
    expect(
      validator.validate('18', args({ field: 'age', op: 'GTE', value: '18' })),
    ).toBe(false);
  });

  it('rejects range operators for boolean fields', () => {
    expect(
      validator.validate(
        true,
        args({ field: 'isEthnicKorean', op: 'EQ', value: true }),
      ),
    ).toBe(true);
    expect(
      validator.validate(
        true,
        args({ field: 'isEthnicKorean', op: 'GTE', value: true }),
      ),
    ).toBe(false);
  });
});
