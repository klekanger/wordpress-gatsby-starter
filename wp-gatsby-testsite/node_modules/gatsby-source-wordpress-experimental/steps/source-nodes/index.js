"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.sourceNodes = void 0;

var _fetchNodeUpdates = _interopRequireWildcard(require("./update-nodes/fetch-node-updates"));

var _fetchNodes = require("./fetch-nodes/fetch-nodes");

var _constants = require("../../constants");

var _store = _interopRequireDefault(require("../../store"));

var _fetchAndCreateNonNodeRootFields = _interopRequireDefault(require("./create-nodes/fetch-and-create-non-node-root-fields"));

const sourceNodes = async (helpers, _pluginOptions) => {
  const {
    cache,
    webhookBody: {
      preview
    }
  } = helpers;

  if (preview) {
    await (0, _fetchNodeUpdates.touchValidNodes)();
    return;
  }

  const lastCompletedSourceTime = await cache.get(_constants.LAST_COMPLETED_SOURCE_TIME);

  const {
    schemaWasChanged
  } = _store.default.getState().remoteSchema;

  const fetchEverything = !lastCompletedSourceTime || schemaWasChanged; // If this is an uncached build,
  // or our initial build to fetch and cache everything didn't complete,
  // pull everything from WPGQL

  if (fetchEverything) {
    await (0, _fetchNodes.fetchAndCreateAllNodes)();
    await cache.set(_constants.LAST_COMPLETED_SOURCE_TIME, Date.now());
  } // If we've already successfully pulled everything from WPGraphQL
  // just pull the latest changes
  else if (!fetchEverything) {
      await (0, _fetchNodeUpdates.default)({
        since: lastCompletedSourceTime
      });
    } // fetch non-node root fields such as settings.
  // For now, we're refetching them on every build


  await (0, _fetchAndCreateNonNodeRootFields.default)();
};

exports.sourceNodes = sourceNodes;