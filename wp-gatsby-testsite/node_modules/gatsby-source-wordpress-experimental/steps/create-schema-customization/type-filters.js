"use strict";

exports.__esModule = true;
exports.typeDefinitionFilters = void 0;

var _createRemoteMediaItemNode = require("../source-nodes/create-nodes/create-remote-media-item-node");

// @todo move this to plugin options
const typeDefinitionFilters = [{
  typeName: `__all`,
  typeDef: typeDef => {
    var _typeDef$fields;

    if (typeDef === null || typeDef === void 0 ? void 0 : (_typeDef$fields = typeDef.fields) === null || _typeDef$fields === void 0 ? void 0 : _typeDef$fields.date) {
      const dateField = Object.assign({}, typeDef.fields.date, {
        type: `Date`,
        extensions: {
          dateformat: {}
        }
      });
      typeDef.fields.date = dateField;
    }

    return typeDef;
  }
}, {
  typeName: `MediaItem`,
  typeDef: (objectType, {
    pluginOptions
  }) => {
    // @todo: this field is deprecated as of 0.1.8, remove this when we get to beta
    objectType.fields.remoteFile = {
      type: `File`,
      deprecationReason: `MediaItem.remoteFile was renamed to localFile`,
      resolve: (mediaItemNode, _, context) => {
        if (!mediaItemNode) {
          return null;
        }

        const remoteMediaNodeId = mediaItemNode.remoteFile && mediaItemNode.remoteFile.id ? mediaItemNode.remoteFile.id : null;

        if (remoteMediaNodeId) {
          const node = context.nodeModel.getNodeById({
            id: mediaItemNode.remoteFile.id,
            type: `File`
          });

          if (node) {
            return node;
          }
        }

        return (0, _createRemoteMediaItemNode.createRemoteMediaItemNode)({
          mediaItemNode
        });
      }
    };
    objectType.fields.localFile = {
      type: `File`,
      resolve: (mediaItemNode, _, context) => {
        var _mediaItemNode$localF;

        if (!mediaItemNode) {
          return null;
        }

        const localMediaNodeId = mediaItemNode === null || mediaItemNode === void 0 ? void 0 : (_mediaItemNode$localF = mediaItemNode.localFile) === null || _mediaItemNode$localF === void 0 ? void 0 : _mediaItemNode$localF.id;

        if (localMediaNodeId) {
          const node = context.nodeModel.getNodeById({
            id: mediaItemNode.localFile.id,
            type: `File`
          });

          if (node) {
            return node;
          }
        }

        return (0, _createRemoteMediaItemNode.createRemoteMediaItemNode)({
          mediaItemNode
        });
      }
    };
    return objectType;
  }
}];
exports.typeDefinitionFilters = typeDefinitionFilters;