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
});
