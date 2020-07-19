"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cacheFetchedTypes = void 0;

var _store = _interopRequireDefault(require("../../store"));

const cacheFetchedTypes = async () => {
  const state = _store.default.getState();

  const {
    fetchedTypes
  } = state.remoteSchema;
  const {
    helpers
  } = state.gatsbyApi;
  await helpers.cache.set(`previously-fetched-types`, Array.from([...fetchedTypes]));
};

exports.cacheFetchedTypes = cacheFetchedTypes;