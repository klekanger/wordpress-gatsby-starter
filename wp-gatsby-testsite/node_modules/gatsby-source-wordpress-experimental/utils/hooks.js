"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.addNodeFilter = exports.applyNodeFilter = void 0;

require("source-map-support/register");

var _store = _interopRequireDefault(require("../store"));

// const filteredData = applyNodeFilter({
//     name: `wp-template-directories`,
//     context: {
//         sourcePluginId: pluginOptions.id,
//         nodeId: `jfdklsjfks8`
//     },
//     data: {},
// })
// exports.onPreInit = ({ pluginOptions }) => {
//     addNodeFilter({
//         name: `wp-template-directories`,
//         filter: async ({ context, data, name, helpers, actions }) => {
//             if (context.sourcePluginId === pluginOptions.id) {
//                 const node = await helpers.getNode(context.nodeId)
//             }
//         },
//     })
// }
// exports.createNodes = () => {
//     const node = fetchNode()
//     const filteredNode = applyFilter({
//         data: {
//             node
//         },
//     })
//     createNode(filteredNode)
// }
const applyNodeFilter = async ({
  name,
  context,
  data
}) => {
  var _store$getState$wpHoo;

  if (!name) {
    return data;
  }

  const nodeFilters = (_store$getState$wpHoo = _store.default.getState().wpHooks.nodeFilters) === null || _store$getState$wpHoo === void 0 ? void 0 : _store$getState$wpHoo[name];

  if (!nodeFilters || !nodeFilters.length) {
    return data;
  }

  const sortedNodeFilters = nodeFilters.sort((a, b) => a.priority - b.priority);

  for (const {
    filter
  } of sortedNodeFilters) {
    data = filter({
      data,
      context,
      name
    });
  }

  return data;
}; // { name, filter, data, context }


exports.applyNodeFilter = applyNodeFilter;

const addNodeFilter = filter => {
  _store.default.dispatch.wpHooks.addNodeFilter(filter);
};

exports.addNodeFilter = addNodeFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy9ob29rcy5qcyJdLCJuYW1lcyI6WyJhcHBseU5vZGVGaWx0ZXIiLCJuYW1lIiwiY29udGV4dCIsImRhdGEiLCJub2RlRmlsdGVycyIsInN0b3JlIiwiZ2V0U3RhdGUiLCJ3cEhvb2tzIiwibGVuZ3RoIiwic29ydGVkTm9kZUZpbHRlcnMiLCJzb3J0IiwiYSIsImIiLCJwcmlvcml0eSIsImZpbHRlciIsImFkZE5vZGVGaWx0ZXIiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBZ0NBOztBQWhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFJTyxNQUFNQSxlQUFlLEdBQUcsT0FBTztBQUFFQyxFQUFBQSxJQUFGO0FBQVFDLEVBQUFBLE9BQVI7QUFBaUJDLEVBQUFBO0FBQWpCLENBQVAsS0FBbUM7QUFBQTs7QUFDaEUsTUFBSSxDQUFDRixJQUFMLEVBQVc7QUFDVCxXQUFPRSxJQUFQO0FBQ0Q7O0FBRUQsUUFBTUMsV0FBVyw0QkFBR0MsZUFBTUMsUUFBTixHQUFpQkMsT0FBakIsQ0FBeUJILFdBQTVCLDBEQUFHLHNCQUF1Q0gsSUFBdkMsQ0FBcEI7O0FBRUEsTUFBSSxDQUFDRyxXQUFELElBQWdCLENBQUNBLFdBQVcsQ0FBQ0ksTUFBakMsRUFBeUM7QUFDdkMsV0FBT0wsSUFBUDtBQUNEOztBQUVELFFBQU1NLGlCQUFpQixHQUFHTCxXQUFXLENBQUNNLElBQVosQ0FBaUIsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQVVELENBQUMsQ0FBQ0UsUUFBRixHQUFhRCxDQUFDLENBQUNDLFFBQTFDLENBQTFCOztBQUVBLE9BQUssTUFBTTtBQUFFQyxJQUFBQTtBQUFGLEdBQVgsSUFBeUJMLGlCQUF6QixFQUE0QztBQUMxQ04sSUFBQUEsSUFBSSxHQUFHVyxNQUFNLENBQUM7QUFBRVgsTUFBQUEsSUFBRjtBQUFRRCxNQUFBQSxPQUFSO0FBQWlCRCxNQUFBQTtBQUFqQixLQUFELENBQWI7QUFDRDs7QUFFRCxTQUFPRSxJQUFQO0FBQ0QsQ0FsQk0sQyxDQW9CUDs7Ozs7QUFDTyxNQUFNWSxhQUFhLEdBQUlELE1BQUQsSUFBWTtBQUN2Q1QsaUJBQU1XLFFBQU4sQ0FBZVQsT0FBZixDQUF1QlEsYUFBdkIsQ0FBcUNELE1BQXJDO0FBQ0QsQ0FGTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGFwcGx5Tm9kZUZpbHRlcih7XG4vLyAgICAgbmFtZTogYHdwLXRlbXBsYXRlLWRpcmVjdG9yaWVzYCxcbi8vICAgICBjb250ZXh0OiB7XG4vLyAgICAgICAgIHNvdXJjZVBsdWdpbklkOiBwbHVnaW5PcHRpb25zLmlkLFxuLy8gICAgICAgICBub2RlSWQ6IGBqZmRrbHNqZmtzOGBcbi8vICAgICB9LFxuLy8gICAgIGRhdGE6IHt9LFxuLy8gfSlcblxuLy8gZXhwb3J0cy5vblByZUluaXQgPSAoeyBwbHVnaW5PcHRpb25zIH0pID0+IHtcbi8vICAgICBhZGROb2RlRmlsdGVyKHtcbi8vICAgICAgICAgbmFtZTogYHdwLXRlbXBsYXRlLWRpcmVjdG9yaWVzYCxcbi8vICAgICAgICAgZmlsdGVyOiBhc3luYyAoeyBjb250ZXh0LCBkYXRhLCBuYW1lLCBoZWxwZXJzLCBhY3Rpb25zIH0pID0+IHtcbi8vICAgICAgICAgICAgIGlmIChjb250ZXh0LnNvdXJjZVBsdWdpbklkID09PSBwbHVnaW5PcHRpb25zLmlkKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IGhlbHBlcnMuZ2V0Tm9kZShjb250ZXh0Lm5vZGVJZClcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcbi8vICAgICB9KVxuLy8gfVxuXG4vLyBleHBvcnRzLmNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuLy8gICAgIGNvbnN0IG5vZGUgPSBmZXRjaE5vZGUoKVxuXG4vLyAgICAgY29uc3QgZmlsdGVyZWROb2RlID0gYXBwbHlGaWx0ZXIoe1xuLy8gICAgICAgICBkYXRhOiB7XG4vLyAgICAgICAgICAgICBub2RlXG4vLyAgICAgICAgIH0sXG4vLyAgICAgfSlcblxuLy8gICAgIGNyZWF0ZU5vZGUoZmlsdGVyZWROb2RlKVxuLy8gfVxuXG5pbXBvcnQgc3RvcmUgZnJvbSBcIn4vc3RvcmVcIlxuXG5leHBvcnQgY29uc3QgYXBwbHlOb2RlRmlsdGVyID0gYXN5bmMgKHsgbmFtZSwgY29udGV4dCwgZGF0YSB9KSA9PiB7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICBjb25zdCBub2RlRmlsdGVycyA9IHN0b3JlLmdldFN0YXRlKCkud3BIb29rcy5ub2RlRmlsdGVycz8uW25hbWVdXG5cbiAgaWYgKCFub2RlRmlsdGVycyB8fCAhbm9kZUZpbHRlcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIGNvbnN0IHNvcnRlZE5vZGVGaWx0ZXJzID0gbm9kZUZpbHRlcnMuc29ydCgoYSwgYikgPT4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHkpXG5cbiAgZm9yIChjb25zdCB7IGZpbHRlciB9IG9mIHNvcnRlZE5vZGVGaWx0ZXJzKSB7XG4gICAgZGF0YSA9IGZpbHRlcih7IGRhdGEsIGNvbnRleHQsIG5hbWUgfSlcbiAgfVxuXG4gIHJldHVybiBkYXRhXG59XG5cbi8vIHsgbmFtZSwgZmlsdGVyLCBkYXRhLCBjb250ZXh0IH1cbmV4cG9ydCBjb25zdCBhZGROb2RlRmlsdGVyID0gKGZpbHRlcikgPT4ge1xuICBzdG9yZS5kaXNwYXRjaC53cEhvb2tzLmFkZE5vZGVGaWx0ZXIoZmlsdGVyKVxufVxuIl19