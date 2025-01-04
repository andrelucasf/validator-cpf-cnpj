import { validateCpf } from '../cpf.validator';

describe('validateCpf', () => {
  it('Deve ser validado mesmo com formatação', () => {
    const value = '926.412.310-50';
    expect(validateCpf(value)).toEqual(true);
  });

  it('Deve ser validado', () => {
    const value = '386.085.490-93';
    expect(validateCpf(value)).toEqual(true);
  });

  it('Não deve ser validado', () => {
    const value = '386.085.490-94';
    expect(validateCpf(value)).toEqual(false);
  });
});
