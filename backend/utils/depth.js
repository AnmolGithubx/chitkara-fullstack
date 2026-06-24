function calculateDepth(node, graph) {
    const children = graph[node] || [];
  
    if (children.length === 0) {
      return 1;
    }
  
    let maxDepth = 0;
  
    for (const child of children) {
      maxDepth = Math.max(
        maxDepth,
        calculateDepth(child, graph)
      );
    }
  
    return maxDepth + 1;
  }
  
  module.exports = calculateDepth;