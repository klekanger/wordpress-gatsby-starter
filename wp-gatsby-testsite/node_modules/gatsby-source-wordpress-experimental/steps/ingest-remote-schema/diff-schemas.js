"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.checkIfSchemaHasChanged = void 0;

var _fetchGraphql = _interopRequireDefault(require("../../utils/fetch-graphql"));

var _store = _interopRequireDefault(require("../../store"));

var _gql = _interopRequireDefault(require("../../utils/gql"));

var _formatLogMessage = require("../../utils/format-log-message");

var _constants = require("../../constants");

const checkIfSchemaHasChanged = async (_, pluginOptions) => {
  const state = _store.default.getState();

  const {
    helpers
  } = state.gatsbyApi;
  const lastCompletedSourceTime = await helpers.cache.get(_constants.LAST_COMPLETED_SOURCE_TIME);
  const activity = helpers.reporter.activityTimer((0, _formatLogMessage.formatLogMessage)(`diff schemas`));

  if (pluginOptions.verbose && lastCompletedSourceTime) {
    activity.start();
  }

  const MD5_CACHE_KEY = `introspection-node-query-md5`;
  const {
    data
  } = await (0, _fetchGraphql.default)({
    query: (0, _gql.default)`
      {
        schemaMd5
        # also get the wpUrl to save on # of requests
        # @todo maybe there's a better place for this
        generalSettings {
          url
        }
      }
    `
  });
  const {
    schemaMd5,
    generalSettings: {
      url: wpUrl
    }
  } = data;
  const cachedSchemaMd5 = await helpers.cache.get(MD5_CACHE_KEY);
  await helpers.cache.set(MD5_CACHE_KEY, schemaMd5);
  const schemaWasChanged = schemaMd5 !== cachedSchemaMd5;

  if (lastCompletedSourceTime && schemaWasChanged && pluginOptions && pluginOptions.verbose) {
    helpers.reporter.log(``);
    helpers.reporter.warn((0, _formatLogMessage.formatLogMessage)(`The remote schema has changed since the last build, re-fetching all data`));
    helpers.reporter.info((0, _formatLogMessage.formatLogMessage)(`Cached schema md5: ${cachedSchemaMd5}`));
    helpers.reporter.info((0, _formatLogMessage.formatLogMessage)(`Remote schema md5: ${schemaMd5}`));
    helpers.reporter.log(``);
  } else if (!lastCompletedSourceTime && pluginOptions.verbose) {
    helpers.reporter.log(``);
    helpers.reporter.info((0, _formatLogMessage.formatLogMessage)(`\n\n\tThis is either your first build or the cache was cleared.\n\tPlease wait while your WordPress data is synced to your Gatsby cache.\n\n\tMaybe now's a good time to get up and stretch? :D\n`));
  } // record wether the schema changed so other logic can beware
  // as well as the wpUrl because we need this sometimes :p


  _store.default.dispatch.remoteSchema.setState({
    schemaWasChanged,
    wpUrl
  });

  if (pluginOptions.verbose && lastCompletedSourceTime) {
    activity.end();
  }

  return schemaWasChanged;
};

exports.checkIfSchemaHasChanged = checkIfSchemaHasChanged;