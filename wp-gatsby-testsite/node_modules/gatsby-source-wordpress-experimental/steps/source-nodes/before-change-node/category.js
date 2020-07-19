"use strict";

exports.__esModule = true;
exports.categoryBeforeChangeNode = void 0;

var _processNode = require("../create-nodes/process-node");

const categoryBeforeChangeNode = async ({
  remoteNode,
  actionType,
  wpStore,
  fetchGraphql,
  helpers,
  actions,
  buildTypeName
}) => {
  var _remoteNode$wpChildre, _remoteNode$wpChildre2;

  if (actionType !== `UPDATE` && actionType !== `CREATE_ALL` && actionType !== `CREATE`) {
    // no need to update children if we're not updating an existing category
    // if we're creating a new category it will be empty initially.
    // so we run this function when updating nodes or when initially
    // creating all nodes
    return null;
  }

  if (!(remoteNode === null || remoteNode === void 0 ? void 0 : (_remoteNode$wpChildre = remoteNode.wpChildren) === null || _remoteNode$wpChildre === void 0 ? void 0 : (_remoteNode$wpChildre2 = _remoteNode$wpChildre.nodes) === null || _remoteNode$wpChildre2 === void 0 ? void 0 : _remoteNode$wpChildre2.length)) {
    // if we don't have any child category items to fetch, skip out
    return null;
  }

  const state = wpStore.getState();
  const {
    selectionSet
  } = state.remoteSchema.nodeQueries.categories;
  const {
    wpUrl
  } = state.remoteSchema;
  const {
    pluginOptions
  } = state.gatsbyApi;
  const query = `
        fragment CATEGORY_FIELDS on Category {
          ${selectionSet}
        }

        query {
            ${remoteNode.wpChildren.nodes.map(({
    id
  }, index) => `id__${index}: category(id: "${id}") { ...CATEGORY_FIELDS }`).join(` `)}
          }`;
  const {
    data
  } = await fetchGraphql({
    query,
    errorContext: `Error occured while recursively fetching "Category" nodes in beforeChangeNode API.`
  });
  const remoteChildCategoryNodes = Object.values(data);
  const additionalNodeIds = remoteChildCategoryNodes.map(({
    id
  } = {}) => id);
  await Promise.all(remoteChildCategoryNodes.map(async remoteCategoryNode => {
    var _remoteCategoryNode$w, _remoteCategoryNode$w2;

    if (remoteCategoryNode === null || remoteCategoryNode === void 0 ? void 0 : (_remoteCategoryNode$w = remoteCategoryNode.wpChildren) === null || _remoteCategoryNode$w === void 0 ? void 0 : (_remoteCategoryNode$w2 = _remoteCategoryNode$w.nodes) === null || _remoteCategoryNode$w2 === void 0 ? void 0 : _remoteCategoryNode$w2.length) {
      // recursively fetch child category items
      const {
        additionalNodeIds: childNodeIds
      } = await categoryBeforeChangeNode({
        remoteNode: remoteCategoryNode,
        actionType: `CREATE`,
        wpStore,
        fetchGraphql,
        helpers,
        actions,
        buildTypeName
      });
      childNodeIds.forEach(id => additionalNodeIds.push(id));
    }

    const type = buildTypeName(`Category`);
    const processedNode = await (0, _processNode.processNode)({
      node: remoteCategoryNode,
      pluginOptions,
      wpUrl,
      helpers
    });
    await actions.createNode(Object.assign({}, processedNode, {
      nodeType: `Category`,
      type: `Category`,
      parent: null,
      internal: {
        contentDigest: helpers.createContentDigest(remoteCategoryNode),
        type
      }
    }));
  }));
  return {
    additionalNodeIds
  };
};

exports.categoryBeforeChangeNode = categoryBeforeChangeNode;