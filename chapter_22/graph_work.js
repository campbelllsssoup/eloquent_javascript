class GraphNode {
  constructor() {
    this.pos = new Vec(Math.random() * 1000,
                        Math.random() * 1000);
    this.edges = [];
  }
  connect(other) {
    this.edges.push(other);
    other.edges.push(this);
  }
  hasEdge(other) {
    return this.edges.includes(other);
  }
}

function treeGraph(depth, branches) {
  let graph = [new GraphNode()];
  if (depth > 1) {
    for (let i = 0; i < branches; i++) {
      let subGraph = treeGraph(depth - 1, branches);
      graph[0].connect(subGraph[0]);
      graph = graph.concat(subGraph);
    }
  }
  return graph;
}

const springLength = 40; // resting length
const springStrength = 0.1; // 'deforming force' || 'load' 
const repulsionStrength = 1500; // controls the repelling strength of nodes
const skipDistance = 175;

function forceDirected_simple(graph) {
  for (let node of graph) {
    for (let other of graph) {
      if (other == node) continue;
      let apart = other.pos.minus(node.pos);
      let distance = Math.max(1, apart.length);
      let forceSize = -repulsionStrength / (distance * distance);
      if (node.hasEdgeFast(other)) {
        forceSize += (distance - springLength) * springStrength;
      }
      let normalized = apart.times(1 / distance);
      node.pos = node.pos.plus(normalized.times(forceSize));
    }
  }
}

function runLayout(implementation, graph) {
  function run(steps, time) {
    let startTime = Date.now();
    for (let i = 0; i < 100; i++) {
      implementation(graph);
    }
    time += Date.now() - startTime;
    drawGraph(graph);
    if (steps == 0) console.log(time);
    else {
      requestAnimationFrame(function animateCallback(){ 
        run(steps - 100, time);
      });
    }
  }
  run(4000, 0)
}
// runLayout(forceDirected_simple, treeGraph(4,4));


// avoid 'working double'
function forceDirected_noRepeat(graph) {
  for (let i = 0; i < graph.length; i++) {
    let node = graph[i];
    for (let j = i + 1; j < graph.length; j++) { // prevents work doubling
      let other = graph[j];
      let apart = other.pos.minus(node.pos);
      let distance = Math.max(1, apart.length);
      let forceSize = -repulsionStrength / ( distance * distance );
      if (node.hasEdgeFast(other)) {
        forceSize += (distance - springLength) * springStrength;
      }
      let applied = apart.times(forceSize / distance);
      node.pos = node.pos.plus(applied);
      other.pos = other.pos.minus(applied);
    }
  }
}
// runLayout(forceDirected_noRepeat, treeGraph(4,4));

// skip work that hardly has an effect on the outcome

// in our case, we will skip repulsion on nodes that don't share an edge, and
// are the 'skipDistance' units away from each other 
function forceDirected_skip(graph) {
  for (let i = 0; i < graph.length; i++) {
    let node = graph[i];
    for (let j = i + 1; j < graph.length; j++) { // optimization step 1
      let other = graph[j];
      let apart = other.pos.minus(node.pos);
      let distance = Math.max(1, apart.length);
      let hasEdge = node.hasEdgeFast(other);
      if (!hasEdge && distance > skipDistance) continue; // optimization step 2
      let forceSize = -repulsionStrength / (distance * distance);
      if (hasEdge) {
        forceSize += (distance - springLength) * springStrength;
      }
      let applied = apart.times(forceSize / distance);
      node.pos = node.pos.plus(applied);
      other.pos = other.pos.minus(applied);
    }
  }
}
// runLayout(forceDirected_skip, treeGraph(4,4));

// simple avoiding calls to Array#includes saves us a sizeable chunk of time
// on some browsers
GraphNode.prototype.hasEdgeFast = function(other) {
  for (let i = 0; i < this.edges.length; i++) {
    if (this.edges[i] === other) return true;
  }
  return false;
}
// runLayout(forceDirected_skip, treeGraph(4,4));

// 30-60% faster because we're using primitives instead of an intermediary class
function forceDirected_noVector(graph) {
  for (let i = 0; i < graph.length; i++) {
    let node = graph[i];
    for (let j = i + 1; j < graph.length; j++) {
      let other = graph[j];
      let apartX = other.pos.x - node.pos.x;
      let apartY = other.pos.y - node.pos.y;
      let distance = Math.max(1, Math.sqrt(apartX * apartX + apartY * apartY))
      
      let hasEdge = node.hasEdgeFast(other);
      if (!hasEdge && distance > skipDistance) continue;
      let forceSize = -repulsionStrength / (distance * distance);
      if (hasEdge) {
        forceSize += (distance - springLength) * springStrength;
      }
      let forceX = apartX * forceSize / distance;
      let forceY = apartY * forceSize / distance;
      node.pos.x += forceX; node.pos.y += forceY;
      other.pos.x -= forceX; other.pos.y -= forceY;
    } 
  }
}
runLayout(forceDirected_noVector, treeGraph(4,4));





// On Chrome, v. 84.0.4174.105 
// Semantic versioning - release.breaking.feature.fix

// Performance
// 1300-1400ms _simple; 
// 900-1300ms _noRepeat; smoother movement in the animation
// 656ms first run; 500-700ms _skip; quicker, slick movement
// 619ms first run; 500-650ms avoiding Arr#includes;
// 350-500ms _noVector;
// After optimizations code runs ~3x faster.