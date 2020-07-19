"use strict";

exports.__esModule = true;
exports.runApisInSteps = exports.runSteps = void 0;

var _formatLogMessage = require("./format-log-message");

const runSteps = async (steps, helpers, pluginOptions, apiName) => {
  for (const step of steps) {
    try {
      var _pluginOptions$debug;

      if (pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$debug = pluginOptions.debug) === null || _pluginOptions$debug === void 0 ? void 0 : _pluginOptions$debug.timeBuildSteps) {
        const activity = helpers.reporter.activityTimer((0, _formatLogMessage.formatLogMessage)(`step -${!apiName ? `-` : ``}> ${step.name}`, {
          useVerboseStyle: true
        }));
        activity.start();
        await step(helpers, pluginOptions);
        activity.end();
        continue;
      }

      await step(helpers, pluginOptions);
    } catch (e) {
      helpers.reporter.error(e);
      helpers.reporter.panic((0, _formatLogMessage.formatLogMessage)(`\n\n\tEncountered a critical error when running the ${apiName}.${step.name} build step.\n\tSee above for more information.`, {
        useVerboseStyle: true
      }));
    }
  }
};

exports.runSteps = runSteps;

const runApiSteps = (steps, apiName) => async (helpers, pluginOptions) => runSteps(steps, helpers, pluginOptions, apiName);

const runApisInSteps = nodeApis => Object.entries(nodeApis).reduce((gatsbyNodeExportObject, [apiName, apiSteps]) => Object.assign({}, gatsbyNodeExportObject, {
  [apiName]: runApiSteps(apiSteps, apiName)
}), {});

exports.runApisInSteps = runApisInSteps;