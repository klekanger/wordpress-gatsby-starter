"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.sourcePreviews = void 0;

var _update = require("./wp-actions/update");

var _formatLogMessage = require("../../../utils/format-log-message");

var _chalk = _interopRequireDefault(require("chalk"));

const sourcePreviews = async ({
  webhookBody,
  reporter
}, {
  url
}) => {
  if (!webhookBody || !webhookBody.preview || !webhookBody.previewId || !webhookBody.token || !webhookBody.remoteUrl) {
    return;
  }

  if (url.split(`//`)[1] !== webhookBody.remoteUrl.split(`//`)[1]) {
    reporter.panic((0, _formatLogMessage.formatLogMessage)(`Received preview data from a different remote URL than the one specified in plugin options. \n\n ${_chalk.default.bold(`Remote URL:`)} ${webhookBody.remoteUrl}\n ${_chalk.default.bold(`Plugin options URL:`)} ${url}`));
  }

  await (0, _update.fetchAndCreateSingleNode)(Object.assign({
    actionType: `PREVIEW`
  }, webhookBody));
};

exports.sourcePreviews = sourcePreviews;