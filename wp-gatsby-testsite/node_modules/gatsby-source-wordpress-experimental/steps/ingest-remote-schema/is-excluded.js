"use strict";

exports.__esModule = true;
exports.fieldIsExcludedOnParentType = exports.typeIsExcluded = void 0;

const typeIsExcluded = ({
  pluginOptions,
  typeName
}) => pluginOptions && pluginOptions.type[typeName] && pluginOptions.type[typeName].exclude;

exports.typeIsExcluded = typeIsExcluded;

const fieldIsExcludedOnParentType = ({
  pluginOptions,
  field,
  parentType
}) => {
  var _allTypeSettings$pare, _allTypeSettings$pare2;

  const allTypeSettings = pluginOptions.type;
  const fieldIsExcludedOnParentType = (_allTypeSettings$pare = allTypeSettings[parentType.name]) === null || _allTypeSettings$pare === void 0 ? void 0 : (_allTypeSettings$pare2 = _allTypeSettings$pare.excludeFieldNames) === null || _allTypeSettings$pare2 === void 0 ? void 0 : _allTypeSettings$pare2.includes(field.name);
  return !!fieldIsExcludedOnParentType;
};

exports.fieldIsExcludedOnParentType = fieldIsExcludedOnParentType;