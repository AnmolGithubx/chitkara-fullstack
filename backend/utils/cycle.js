function hasCycle(graph, start) {
    const visited = new Set();
    const recursionStack = new Set();
  
    function dfs(node) {
      if (recursionStack.has(node)) {
        return true;
      }
  
      if (visited.has(node)) {
        return false;
      }
  
      visited.add(node);
      recursionStack.add(node);
  
      const children = graph[node] || [];
  
      for (const child of children) {
        if (dfs(child)) {
          return true;
        }
      }
  
      recursionStack.delete(node);
  
      return false;
    }
  
    return dfs(start);
  }
  
  module.exports = hasCycle;