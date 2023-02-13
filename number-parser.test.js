const number = require('./number-parser')

describe('Testing numbers convertion', function () {
  describe('Testing simple number conversion', function () {
    it('should convert the number five', () => {
      const result = number.parse('cinco')
      expect(result).toBe(5)
    })

    it('should convert the number fifteen', () => {
      const result = number.parse('quinze')
      expect(result).toBe(15)
    })

    it('should convert the number fifty', () => {
      const result = number.parse('cinquenta')
      expect(result).toBe(50)
    })
  });

  describe('Testing complex numbers conversion', function () {
    it('should convert the number fifty five', () => {
      const result = number.parse('cinquenta e cinco')
      expect(result).toBe(55)
    })
  });

  describe('Testing values that is not number', function () {
    it('sould return null to non numeric values', () => {
      const result = number.parse('não é número')
      expect(result).toBeNull()
    })
  })

  describe('Testing meters description to number', function () {
    it('should convert meters using the letter e to concatenate', () => {
      const result = number.parse('3 e 30')
      expect(result).toBe(330)
    })

    it('should ignore non numeric number values', () => {
      const result = number.parse('3 metros e 10')
      expect(result).toBe(310)
    })

    it('should convert param with number and transcription', () => {
      const result = number.parse('três e 10')
      expect(result).toBe(310)
    })
  });

  describe('Testing decimal numbers', function () {
    it('should convert decimal numbers with comma (,)', () => {
      const result = number.parse('3,5')
      expect(result).toBe(3.5)
    })

    it('should convert decimal numbers with dot (.)', () => {
      const result = number.parse('3.5')
      expect(result).toBe(3.5)
    })
  })
});
