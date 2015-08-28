'use strict';

import React from 'react'
import Reflux from 'reflux'
import Page from 'lib/large/page'
import Actions from '../actions'

let json = {
  monteCarlo: {
    samples: 10
  },
  metrics:
    [
      {id: '124', name: 'cats', guesstimates: [{ distribution: { type: 'point', value: 300 }, estimate: {value: 300} }] },
      {id: '125', name: 'dogs', guesstimates: [{ distribution: { type: 'point', value: 500 }, estimate: {value: 500} }] },
      {id: '126', name: 'animals', guesstimates: [{ distribution: {type: 'point', value: 40 }, funct: {inputs: ['124', '125'], function_type: 'addition'} }] },
      {id: '127', name: 'humans', guesstimates: [{ distribution: {type: 'point', value: 500 }, estimate: {value: 500} }] },
      {id: '128', name: 'beings', guesstimates: [{ distribution: {type: 'point', value: 40 }, funct: {inputs: ['126', '127'], function_type: 'addition'} }] }
    ]
};

const SpaceStore = Reflux.createStore({
  listenables: [Actions],
  onMetricPropogate(metricId) {
    let metric = _.find(this.space.metrics, {id: metricId});
    metric.propagate()
    this.trigger(this.space)
  },
  getInitialState () {
    this.space = new Page(json);
    return this.space;
  }
})

module.exports = SpaceStore;