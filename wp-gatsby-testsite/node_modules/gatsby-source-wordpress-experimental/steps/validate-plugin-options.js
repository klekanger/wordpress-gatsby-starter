"use strict";

exports.__esModule = true;
exports.validatePluginOptions = void 0;

require("source-map-support/register");

const validatePluginOptions = (helpers, pluginOptions) => {
  var _pluginOptions$exclud, _pluginOptions$exclud2, _pluginOptions$exclud3;

  if (pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$exclud = pluginOptions.excludeFields) === null || _pluginOptions$exclud === void 0 ? void 0 : _pluginOptions$exclud.length) {
    helpers.reporter.log(``);
    helpers.reporter.warn(formatLogMessage( // @todo
    `\n\nPlugin options excludeFields has been renamed to excludeFieldNames.\nBoth options work for now, but excludeFields will be removed in a future version\n(likely when we get to beta) in favour of excludeFieldNames.\n\n`));
  }

  if ((pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$exclud2 = pluginOptions.excludeFieldNames) === null || _pluginOptions$exclud2 === void 0 ? void 0 : _pluginOptions$exclud2.length) || ( // @todo remove excludeFields option in beta release since it's been renamed to excludeFieldNames
  pluginOptions === null || pluginOptions === void 0 ? void 0 : (_pluginOptions$exclud3 = pluginOptions.excludeFields) === null || _pluginOptions$exclud3 === void 0 ? void 0 : _pluginOptions$exclud3.length)) {
    store.dispatch.remoteSchema.addFieldsToBlackList(pluginOptions.excludeFieldNames || pluginOptions.excludeFields);
  }
};

exports.validatePluginOptions = validatePluginOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGVwcy92YWxpZGF0ZS1wbHVnaW4tb3B0aW9ucy5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZVBsdWdpbk9wdGlvbnMiLCJoZWxwZXJzIiwicGx1Z2luT3B0aW9ucyIsImV4Y2x1ZGVGaWVsZHMiLCJsZW5ndGgiLCJyZXBvcnRlciIsImxvZyIsIndhcm4iLCJmb3JtYXRMb2dNZXNzYWdlIiwiZXhjbHVkZUZpZWxkTmFtZXMiLCJzdG9yZSIsImRpc3BhdGNoIiwicmVtb3RlU2NoZW1hIiwiYWRkRmllbGRzVG9CbGFja0xpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxNQUFNQSxxQkFBcUIsR0FBRyxDQUFDQyxPQUFELEVBQVVDLGFBQVYsS0FBNEI7QUFBQTs7QUFDL0QsTUFBSUEsYUFBSixhQUFJQSxhQUFKLGdEQUFJQSxhQUFhLENBQUVDLGFBQW5CLDBEQUFJLHNCQUE4QkMsTUFBbEMsRUFBMEM7QUFDeENILElBQUFBLE9BQU8sQ0FBQ0ksUUFBUixDQUFpQkMsR0FBakIsQ0FBc0IsRUFBdEI7QUFDQUwsSUFBQUEsT0FBTyxDQUFDSSxRQUFSLENBQWlCRSxJQUFqQixDQUNFQyxnQkFBZ0IsRUFDZDtBQUNDLGlPQUZhLENBRGxCO0FBTUQ7O0FBRUQsTUFDRSxDQUFBTixhQUFhLFNBQWIsSUFBQUEsYUFBYSxXQUFiLHNDQUFBQSxhQUFhLENBQUVPLGlCQUFmLGtGQUFrQ0wsTUFBbEMsT0FDQTtBQUNBRixFQUFBQSxhQUZBLGFBRUFBLGFBRkEsaURBRUFBLGFBQWEsQ0FBRUMsYUFGZiwyREFFQSx1QkFBOEJDLE1BRjlCLENBREYsRUFJRTtBQUNBTSxJQUFBQSxLQUFLLENBQUNDLFFBQU4sQ0FBZUMsWUFBZixDQUE0QkMsb0JBQTVCLENBQ0VYLGFBQWEsQ0FBQ08saUJBQWQsSUFBbUNQLGFBQWEsQ0FBQ0MsYUFEbkQ7QUFHRDtBQUNGLENBcEJNIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHZhbGlkYXRlUGx1Z2luT3B0aW9ucyA9IChoZWxwZXJzLCBwbHVnaW5PcHRpb25zKSA9PiB7XG4gIGlmIChwbHVnaW5PcHRpb25zPy5leGNsdWRlRmllbGRzPy5sZW5ndGgpIHtcbiAgICBoZWxwZXJzLnJlcG9ydGVyLmxvZyhgYClcbiAgICBoZWxwZXJzLnJlcG9ydGVyLndhcm4oXG4gICAgICBmb3JtYXRMb2dNZXNzYWdlKFxuICAgICAgICAvLyBAdG9kb1xuICAgICAgICBgXFxuXFxuUGx1Z2luIG9wdGlvbnMgZXhjbHVkZUZpZWxkcyBoYXMgYmVlbiByZW5hbWVkIHRvIGV4Y2x1ZGVGaWVsZE5hbWVzLlxcbkJvdGggb3B0aW9ucyB3b3JrIGZvciBub3csIGJ1dCBleGNsdWRlRmllbGRzIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXFxuKGxpa2VseSB3aGVuIHdlIGdldCB0byBiZXRhKSBpbiBmYXZvdXIgb2YgZXhjbHVkZUZpZWxkTmFtZXMuXFxuXFxuYFxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIGlmIChcbiAgICBwbHVnaW5PcHRpb25zPy5leGNsdWRlRmllbGROYW1lcz8ubGVuZ3RoIHx8XG4gICAgLy8gQHRvZG8gcmVtb3ZlIGV4Y2x1ZGVGaWVsZHMgb3B0aW9uIGluIGJldGEgcmVsZWFzZSBzaW5jZSBpdCdzIGJlZW4gcmVuYW1lZCB0byBleGNsdWRlRmllbGROYW1lc1xuICAgIHBsdWdpbk9wdGlvbnM/LmV4Y2x1ZGVGaWVsZHM/Lmxlbmd0aFxuICApIHtcbiAgICBzdG9yZS5kaXNwYXRjaC5yZW1vdGVTY2hlbWEuYWRkRmllbGRzVG9CbGFja0xpc3QoXG4gICAgICBwbHVnaW5PcHRpb25zLmV4Y2x1ZGVGaWVsZE5hbWVzIHx8IHBsdWdpbk9wdGlvbnMuZXhjbHVkZUZpZWxkc1xuICAgIClcbiAgfVxufVxuIl19