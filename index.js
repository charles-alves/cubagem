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
        $(this).toggleClass('table-selected').siblings().removeClass('table-selected');
      })
  }
}

class Input {

  _input
  _debounceTime

  constructor () {
    this._input = $('#description')
  }

  subscribe (fn) {
    var debounce = this._debounce.bind(this)
    this._input.on('input', function () {
      debounce(() => {
        const result = $(this).val()
        fn(result)
      }, 1000)
    })
  }

  _debounce (fn, offset = 500) {
    clearTimeout(this._debounceTime)
    this._debounceTime = setTimeout(fn, offset)
  }

  clear () {
    this._input.val('')
  }
}

const table = new Table()
const input = new Input();

input.subscribe((value) => {
  if (!value) return
  const values = /^(.+?) por (\d+)( por ([\d.]+))?$/.exec(value)
  let length = values[1].replace(/\D/g, '')
  console.log(length)
  if (length.length === 1) {
    length += '00'
  }
  if (values !== null) {
    table.add(new Board(+length, values[2], values[4]));
  }
  input.clear()
})
