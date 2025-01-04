import { validateCnpj } from '../cnpj.validator';

describe('validateCnpj', () => {
  it('Deve ser validado mesmo com formatação', () => {
    const value = '27.005.345/0001-94';
    expect(validateCnpj(value)).toEqual(true);
  });

  it('Deve ser validado', () => {
    const value = '97660309000140';
    expect(validateCnpj(value)).toEqual(true);
  });

  it('Não deve ser validado', () => {
    const value = '97660309000141';
    expect(validateCnpj(value)).toEqual(false);
  });
});
