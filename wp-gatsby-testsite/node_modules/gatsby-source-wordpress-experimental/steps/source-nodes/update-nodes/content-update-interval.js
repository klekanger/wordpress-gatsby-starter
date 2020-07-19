"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.startPollingForContentUpdates = void 0;

var _fetchNodeUpdates = _interopRequireDefault(require("./fetch-node-updates"));

var _formatLogMessage = require("../../../utils/format-log-message");

var _store = _interopRequireDefault(require("../../../store"));

const refetcher = async msRefetchInterval => {
  await (0, _fetchNodeUpdates.default)({
    intervalRefetching: true
  });
  setTimeout(() => refetcher(msRefetchInterval), msRefetchInterval);
};
/**
 * Starts constantly refetching the latest WordPress changes
 * so we can update Gatsby nodes when data changes
 */


const startPollingForContentUpdates = (helpers, pluginOptions) => {
  if (process.env.WP_DISABLE_POLLING) {
    return;
  }

  const {
    verbose
  } = _store.default.getState().gatsbyApi.pluginOptions;

  const msRefetchInterval = pluginOptions && pluginOptions.develop && pluginOptions.develop.nodeUpdateInterval ? pluginOptions.develop.nodeUpdateInterval : 300;

  if (verbose) {
    helpers.reporter.log(``);
    helpers.reporter.info((0, _formatLogMessage.formatLogMessage)`Watching for WordPress changes`);
  }

  refetcher(msRefetchInterval);
};

exports.startPollingForContentUpdates = startPollingForContentUpdates;