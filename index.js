class Board {
  _length;
  _width;
  _height;

  constructor(length, width, height = 3.5) {
    this._length = length;
    this._width = width;
    this._height = height;
    Object.freeze(this)
  }

  length () {
    return this._length
  }

  width () {
    return this._width
  }

  height () {
    return this._height
  }

  calculate () {
    return this._length * this._width * this._height
  }
}

class Table {
  _total = 0
  _boards = []
  constructor (boards = []) {
    if (!Array.isArray(boards)) throw new Error('Table accepts just array as constructor parameter.')
    boards.forEach(b => this.add(b))
  }

  add (board) {
    if (!(board instanceof Board)) throw new Error('Table just adds Boards objects')
    this._boards.push(board)
    $('#table-body').append(this._createTableRow(board))
    this._total += board.calculate()
    $('#total').html(this._total / 1e6+ 'M3')
  }

  _createTableRow (board) {
    return $(`<tr class="metric" data-index="${this._boards.length}"><td>${board.length()}</td><td>${board.width()}</td><td>${board.height()}</td></tr>`)
      .click(function () {
        $(this).toggleClass('table-selected').siblings().removeClass('table-selected')
      })
  }
}

const METRICS_DELIMITER = ' por '
const QUANTITY_DELIMITER = ' de '

class Input {

  _input
  _debounceTime

  constructor () {
    this._input = $('#description')
    this._input.focus()
  }

  subscribe (fn) {
    const input = this
    this._input.on('input', function () {
      input._debounce(() => {
        const value = $(this).val()
        let {quantity, result} = input._parseValue(value);
        if (result?.length >= 2) Array(quantity).fill({length: result[0], width: result[1], height: result[2]}).forEach(v => fn(v))
        input._clear()
      }, 1000)
    })
  }

  _parseValue(value) {
    let quantity = 1
    let description = value
    if (value.includes(QUANTITY_DELIMITER)) {
      const quantityDescription = value.split(QUANTITY_DELIMITER)
      quantity = NumberParser.parse(quantityDescription[0])
      description = quantityDescription[1]
    }
    const result = description.trim().split(METRICS_DELIMITER)
      .map(v => NumberParser.parse(v))
      .filter(v => v !== null);
    return {quantity, result};
  }

  _debounce (fn, offset = 500) {
    clearTimeout(this._debounceTime)
    this._debounceTime = setTimeout(fn, offset)
  }

  _clear () {
    this._input.val('')
  }
}

const table = new Table()
const input = new Input();

input.subscribe(({length, width, height}) => {
  if (length < 10) {
    length = length*100
  }
  table.add(new Board(length, width, height));
})
