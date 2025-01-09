// src/validators/cnpj.validator.ts
export function validateCnpj(document: string): boolean {
  if (typeof document !== 'string') {
    return false;
  }

  // Remove todos os caracteres não numéricos
  document = document.replace(/[^\d]+/g, '');

  // Verifica se a quantidade de dígitos está correta
  if (document.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (ex: 11111111111111)
  if (/^(\d)\1{13}$/.test(document)) {
    return false;
  }

  // Converte os 12 primeiros dígitos em um array de números
  const digits = document.split('').map(Number);

  // Valida o primeiro dígito verificador
  const firstVerifier = calculateDigit(
    digits.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  if (firstVerifier !== digits[12]) {
    return false;
  }

  // Valida o segundo dígito verificador
  const secondVerifier = calculateDigit(
    digits.slice(0, 13),
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  return secondVerifier === digits[13];
}

// Função para calcular o dígito verificador
const calculateDigit = (digits: number[], weights: number[]): number => {
  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index],
    0,
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};
