import {item as Funct} from './formatters/Function.js'
import {item as DistributionTextUpTo} from './formatters/DistributionTextUpTo.js'
import {item as DistributionTextUpToAlternate} from './formatters/DistributionTextUpToAlternate.js'
import {item as DistributionPointText} from './formatters/DistributionPointText.js'
import {item as DistributionUniform} from './formatters/DistributionUniform.js'
import {item as Null} from './formatters/Null.js'

export const formatters = [
  Funct,
  DistributionTextUpTo,
  DistributionTextUpToAlternate,
  DistributionPointText,
]

export function _matchingFormatter(g) {
  const inputType = _.isString(g.text) ? 'TEXT' : 'GRAPHICAL'
  let filtered = formatters.filter(f => f.inputType === inputType)
  return _tryFormattersForMatch(g, filtered)
}

function _tryFormattersForMatch(g, formatters) {
  for(let formatter of formatters) {
    if (formatter.matches(g)) {
      return formatter
    }
  }
  return Null
}

export function format(g) {
  const formatter = _matchingFormatter(g)
  return formatter.format(g)
}

export function errors(g) {
  return _matchingFormatter(g).errors(g)
}

export function preFormatGuesstimate(guesstimate, dGraph) {
  return {
    metric: guesstimate.metric,
    text: guesstimate.input,
    graph: dGraph,
    guesstimateType: guesstimate.guesstimateType
  }
}

export function inputMetrics(guesstimate, dGraph) {
  const g = preFormatGuesstimate(guesstimate, dGraph)

  const formatter = _matchingFormatter(g)
  if (!_.isFunction(formatter.inputMetrics)) { return [] }

  return formatter.inputMetrics(g, dGraph)
}
