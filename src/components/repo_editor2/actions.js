'use strict';

import Reflux from 'reflux'

const FermActions = Reflux.createActions([
    "pageReset",
    "pageSave",

    "metricSelect",
    "metricUpdate",
    "metricDestroy",
    "metricCreate",
    "metricPropogate",

    "functionAdd",
    "estimateAdd",

    "metricLocationUpdate",
    "pageLocationUpdate"
]);

module.exports = FermActions;