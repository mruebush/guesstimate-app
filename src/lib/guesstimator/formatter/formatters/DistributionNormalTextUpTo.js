import {normalTextMixin} from './lib.js'

export const item = Object.assign(
  {}, normalTextMixin,
  {
    guesstimateType: 'NORMAL',
    inputType: 'TEXT',
    formatterName: 'DISTRIBUTION_NORMAL_TEXT_UPTO',
    _symbols: ['->', ':'],
    format(g) {
      const guesstimateType = this.guesstimateType
      const [low, high] = this._numbers(g.text)
      return {guesstimateType, low, high }
    }
  }
)