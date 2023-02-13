const numbers = {'zero': 0, 'um': 1, 'dois': 2, 'três': 3, 'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9, 'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14, 'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19, 'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90}

NumberParser = {
  parse (number) {
    return number.replace(/,/g, '.').split(' ')
      .map(n => Number.isNaN(+n) ? numbers[n] : +n)
      .filter(n => n !== undefined)
      .reduce((a, v) => a < v ? a*100 + v : a + v, null)
  }
}

if (typeof window === 'undefined') module.exports = {NumberParser}
