function buildTree(node, graph) {
    const children = graph[node] || [];
  
    const tree = {};
  
    children.forEach((child) => {
      tree[child] = buildTree(child, graph);
    });
  
    return tree;
  }
  
  module.exports = buildTree;