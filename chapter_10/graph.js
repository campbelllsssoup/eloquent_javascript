const roads = ["Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office",
"Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm", "Grete's House-Shop", "Marketplace-Farm",
"Marketplace-Post Office", "Marketplace-Shop", "Marketplace-Town Hall", "Shop-Town Hall" ];

function addEdge(graph, from, to){  
  if (graph[from] === undefined){
    graph[from] = [to];
  } else if (graph[from].includes(to)) {
    // do nothing in order to assure idempotence
  } else {
    graph[from].push(to);
  }
  return graph;
}

function buildGraph(edges){
  let graph = Object.create(null);
  for (let [from, to] of edges) {
    graph = addEdge(graph, from, to);
    graph = addEdge(graph, to, from);
  }
  return graph;
}

exports.addEdge = addEdge;
exports.buildGraph = buildGraph;