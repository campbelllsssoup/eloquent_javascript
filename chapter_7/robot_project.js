// Chapter 7: Robot Project: NOT DONE...


const roads = ["Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office",
"Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm", "Grete's House-Shop", "Marketplace-Farm",
"Marketplace-Post Office", "Marketplace-Shop", "Marketplace-Town Hall", "Shop-Town Hall" ]
 
/*
	defined the addEdge function outside of the buildGraph function (different from the book)
	for the case of if I would like to add an edge independent of including it in the roads
	array. With the difference graph must be included in addEdge's arguments and the graph
	returned with each call of the function - therefore making us also have to reassign the 
	graph variable that lives inside of buildGraph each time we call this function - BUT
	the upside of writing the function in this way is that the addEdge function is reusable
	outside of the class and it is now also pure. In order to assure the function's purity I 
	added an else if that states that if graph[from].includes(to) then do nothing and 
	keep the graph as is.

	my choice reasoning for making this function idempotent is
	we do not care about frequency in entries of the edges array. If this were a problem 
	where duplicate occurences were improtant in creating the graph (in order to weight 
	relations of two nodes for example) we would not want this effect.
*/ 

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
  let edgesNestedArr = edges.map(r => r.split("-"));
  for (let [from, to] of edgesNestedArr) {
    graph = addEdge(graph, from, to);
    graph = addEdge(graph, to, from);
  }
  return graph;
}

let village = buildGraph(roads);

/* Proof that the addEdge is idempotent:

console.log("Initial village", village);
console.log("Idempotence proven", addEdge(village, "Alice's House", "Bob's House"));

*/

/* Explanation of below in my own words:

	We create a class called VillageState that holds the current state of where
	our robot is at and what parcels are left to be delivered (whether they have
	been picked up yet or not). We'll provide these two variables whenever we
	create an instance of VillageState.

	The method 'move' takes in a destination as an argument - if you provide a 
	destination that is not an adjacent sibling of the current location, your
	robot will not move (program will act as if you made an invalid move but not
	error out or provide output for feedback) The same VillageState instance you 
	called this method on will be returned so that you have the chance to make a
	valid move.
	
	Else, if the destination is an adjacent sibling, we'll:

	- Map over the parcels, and: 

        	1. If the parcel's place is not equal to the place
	        we're currently at, we'll return the parcel as it exists initially (this is 
	        analogous to not picking up a parcel because we are not at the place where
	        it will be picked up from). OR... 

                2. If the parcel's place is equal to the current
	        place we're at, we'll set it's place property to the destination we're headed
	        to (picking it up so that we can deliver it). All parcels that we have picked
	        up will be at 'this.place', so we'll always update those parcel's place as well 
                - even if this isn't where we initially picked them up.

        - Then we'll check each parcel's place property is not equal to it's address property,
	and if if this is false (place property equal to address property) then we'll filter
	out that parcel (drop off the parcel). We set the result of this equal to a variable 
	named parcels.

        - After picking up and dropping off the parcels, we'll create a new VillageState and
	update it with the new parcels array, and a new place set equal to the destination
        (this 'moves' the robot).

        ** Read the code snippet before reading next page and now I feel a bit dumb because
	it's explained there haha - but still happy I broke it down and understood it as it 
	is ** 
*/

class VillageState {
  constructor(place, parcels){
    this.place = place;
    this.parcels = parcels;
  }

  move(destination, graph) {
    if (!graph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

/*
	takes an instance of state, robot (function) that tells
	robot how to deliver package, and memory so that the 
	robot can keep track of where it's been.

	while there are still parcels that belong to a state 
	instance, the robot is run. state is reset after evert
	run of the robot to reflect the current state, and memory	
	is updated after every run to reflect robot's past places.	
	
	After every run the place that the robot visited is output
	to the console, and the whole for loop keeps track of how 
	many times runRobot is run so that you know how many turns
	it took for the robot to finish delivering parcels. 
*/

function runRobot(state, robot, memory, graph){
  for (let turn = 0;; turn++){
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns.`);
      break;
    }
    let action = robot(state, memory, graph);
    state = state.move(action.direction, graph);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// randomly choose a value from an array

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// picks a direction at random, doesn't keep memory

function randomRobot(state, memory, graph) {
  return {direction: randomPick(graph[state.place])}
}


VillageState.random = function random(graph, parcelCount = 5){
  let parcels = [];
  for (let i = 0; i < parcelCount; i++){
    let address = randomPick(Object.keys(graph));
    let place = randomPick(Object.keys(graph));
    while (place === address) {
      place = randomPick(Object.keys(graph))
    }
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
}

let initialState = VillageState.random(village);

// console.log(runRobot(initialState, randomRobot, undefined, village)); // WORKS - not efficient

const mailRoute = ["Alice's House", "Cabin", "Alice's House", "Bob's House", 
"Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", 
"Grete's House", "Farm", "Marketplace", "Post Office"];

function routeRobot(state, memory, graph) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) }
}

// console.log(runRobot(initialState, routeRobot, mailRoute, village)); // WORKS - more efficient

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i=0; i < work.length; i++){
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route, graph) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(graph, place, parcel.place);
    } else {
      route = findRoute(graph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}


// console.log(runRobot(initialState, goalOrientedRobot, [], village)); // WORKS - a bit more efficient


