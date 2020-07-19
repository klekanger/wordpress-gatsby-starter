"use strict";

exports.__esModule = true;
exports.default = exports.touchValidNodes = void 0;

var _constants = require("../../../constants");

var _wpActions = require("./wp-actions");

var _formatLogMessage = require("../../../utils/format-log-message");

var _getGatsbyApi = require("../../../utils/get-gatsby-api");

const touchValidNodes = async () => {
  const {
    helpers
  } = (0, _getGatsbyApi.getGatsbyApi)();
  const {
    cache,
    actions
  } = helpers;
  let validNodeIds = await cache.get(_constants.CREATED_NODE_IDS);
  validNodeIds.forEach(nodeId => actions.touchNode({
    nodeId
  }));
};
/**
 * fetchAndApplyNodeUpdates
 *
 * uses query info (types and gql query strings) fetched/generated in
 * onPreBootstrap to ask WordPress for the latest changes, and then
 * apply creates, updates, and deletes to Gatsby nodes
 */


exports.touchValidNodes = touchValidNodes;

const fetchAndApplyNodeUpdates = async ({
  since,
  intervalRefetching
}) => {
  const {
    helpers,
    pluginOptions
  } = (0, _getGatsbyApi.getGatsbyApi)();
  const {
    cache,
    reporter
  } = helpers;
  let activity;

  if (!intervalRefetching) {
    activity = reporter.activityTimer((0, _formatLogMessage.formatLogMessage)(`pull updates since last build`));
    activity.start();
  }

  if (!since) {
    since = await cache.get(_constants.LAST_COMPLETED_SOURCE_TIME);
  } // Check with WPGQL to create, delete, or update cached WP nodes


  const {
    wpActions,
    didUpdate
  } = await (0, _wpActions.fetchAndRunWpActions)({
    since,
    intervalRefetching,
    helpers,
    pluginOptions
  });

  if ( // if we're refetching, we only want to touch all nodes
  // if something changed
  didUpdate || // if this is a regular build, we want to touch all nodes
  // so they don't get garbage collected
  !intervalRefetching) {
    await touchValidNodes();
  }

  if (!intervalRefetching) {
    activity.end();
  }

  return {
    wpActions,
    didUpdate
  };
};

var _default = fetchAndApplyNodeUpdates;
exports.default = _default;