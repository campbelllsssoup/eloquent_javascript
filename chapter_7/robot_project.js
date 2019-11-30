// Chapter 7: Robot Project: DONE!!!

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
      // delivering a package is considered a step?
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
      return turn;
    }
    let action = robot(state, memory, graph);
    state = state.move(action.direction, graph);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
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

// console.log(runRobot(initialState, randomRobot, undefined, village)); // WORKS

const mailRoute = ["Alice's House", "Cabin", "Alice's House", "Bob's House", 
"Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", 
"Grete's House", "Farm", "Marketplace", "Post Office"];

function routeRobot(state, memory, graph) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) }
}

// console.log(runRobot(initialState, routeRobot, mailRoute, village)); // WORKS 

/*
  the below is an implementation of a DFS. Whenever a robot has not yet encountered
  a place it automatically goes there. Though this solution works better for a parcelList
  that has 5 parcels, it doesn't scale well for a parcelList that has 100 packages, in that
  case you'd want to use routeRobot because it hits each place twice as it follows a route
  throughout the map.

  Average for routeRobot vs goalOrientedRobot when processing 5 parcels:
  - routeRobot: 18 steps
  - goalOrientedRobot: 15 steps

  Average for routeRobot vs goalOrientedRobot when processing 1000 parcels:
  - routeRobot: 24 steps
  - goalOrientedRobot: 34.06 steps

  Average steps for routeRobot vs goalOrientedRobot when processing 100000 parcels:
  - routeRobot: 24 steps
  - goalOrientedRobot: 33.54 steps

  NOTE: the averages differ for the number of times you run compareRobots - I only
  ran it once but overall similar comparisons will be drawn.
*/ 

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

// console.log(runRobot(initialState, goalOrientedRobot, [], village)); // WORKS 

//------------------------------------------------------------------------------------------------------

// Exercise 7-1: Measuring a Robot : DONE!!!

/*
        It's hard to objectively compare robots by just letting them 
        solve a few scenarios. Maybe one robot just happened to get 
        easier tasks or the kind of tasks that it is good at, whereas
        the other didn't.

        Write a function compareRobots that takes two robots (and their
        starting memory). It should generate 100 tasks and let each of 
        the robots solve each of these tasks. When done, it should output
        the average number of steps each robot took per task. (Delivering
        one parcel).

        For the sake of fairness, make sure you give each task to both 
        robots, rather than generating different tasks per robot.
*/


// VillageState.random calculates a random package for an initial state of the village
// starting point will always be "Post Office"

// console.log(VillageState.random(village,1));

function compareRobots(graph, robot1, robot1Mem, robot2, robot2Mem){
  let robot1Steps = 0;
  let robot2Steps = 0;
  for (let i=0; i < 100; i++){
    let state = VillageState.random(graph, 5);
    robot1Steps += runRobot(state, robot1, robot1Mem, graph);
    robot2Steps += runRobot(state, robot2, robot2Mem, graph);
  }
  console.log(`${robot1.name} Average Steps: ${robot1Steps / 100}`);
  console.log(`${robot2.name} Average Steps: ${robot2Steps / 100}`);
}

/*
  Note: For large inputs (>100 random parcels), routeRobot is more efficient than goalOrientedRobot,
  at 10 parcels their efficiency starts to be around the same number of steps.

  Took about 20 seconds to run when there were 100000 parcels per test.
*/

//------------------------------------------------------------------------------------------------------

// Exercise 7-2: Robot Efficiency : NOT DONE...

/*
        NOTE: Before attempting to solve this, look into graph theory.

        Can you write a robot that finishes the task faster than 
        goalOrientedRobot? If you observe that robot's behavior, what
        obviously stupid things does it do? How could those be improved?

        If you solved the previous exercise, you might want to use your 
        compareRobots function to verify whether you improved the robot.


        Hint: 
        The main limitation of goalOrientedRobot is that it considers only
        one parcel at a time. It will often walk back and forth across the 
        village because the parcel it happens to be looking at happens to 
        be at the other side of the map, even if there are others much 
        closer. 

        One possible solution would be to compare routes for all parcels 
        and then take the shortest one. (1)
        
        Even better results can be obtained,
        if there are multiple shortest routes, by preferring the ones that go
        to pick up a parcel instead of delivering a package. (2)


        My thoughts:
        Reorder parcels array so that the parcels with the closest address
        that have not been picked up (parcel place is not equal to the state's place) 
        have the highest priority && take the shortest route to pick up  - after all 
        of the parcels are picked up, the parcels with the closest addresses should be 
        delivered. (3)

        ^^ this could be further optimized if you not only take the shortest route to
        pickup / dropoff parcels, but take the routes that perform the most "work" - 
        "work" here meaning that more packages are picked up / dropped off on the path
        you take (since this doesn't always match up to the shortest path). (4)
*/

// note: you knew this, but just as a reminder - in order to use argument values as hash
// keys you have to place them inside of square brackets so that the variable is evaluated.
// works the same as it does in react when you are assigning form names to their values inside
// the body of a POST/PATCH fetch request.

function findShortestPath(graph, start, target) {
  let level = {[start]: 0};
  let parent = {[start]: null};
  let i = 1;
  let frontier = [start];
  while (frontier.length !== 0){
    let next = [];
    for(let u of frontier){
      for(let v of graph[u]){
        if (level[v] === undefined){
          level[v] = i;
          parent[v] = u;
          next.push(v);
        }
        if (v === target){
          // here I return the shortest route to the target node
          let route = [v];
          while (parent[v] !== start){
            route.push(parent[v]);
            v = parent[v];
          }
          return route.reverse();
        }
      }
    }
    frontier = next;
    i += 1;
  }
}

/*
  the above will find a location using findShortestPath, but now we 
  need to store a route for each possiblity. Use MITOCW notes

  findShortestPath(village, 'Post Office', "Bob's House"); // WORKS!!

  now, use routeRobot combined with the route found by findShortestPath 
  in order to tell the robot where to go for each parcel.

  figure out how to combine findShortestPath with the below logic - DONE!

  prioritize pickup up / dropping off packages at locations that are closest to 
  you..

  - PSEUDOCODE FOR THE ABOVE: -
  1. Before moving the robot, compare all packages that you are not currently carrying
  toPickup = parcels.filter(stateParcel => stateParcel.place !== state.place );
  toDeliver = parcels.filter(parcel => parcel.place === place);
  2. Use the results of that 
*/

function BFSRobot({place, parcels}, route, graph) {
  let toPickup = parcels.filter(parcel => parcel.place !== place);
  toPickup.sort((a,b)=>{
    return findNodeLevel(graph, place, a.place) - findNodeLevel(graph, place, b.place);
  })
  let toDeliver = parcels.filter(parcel => parcel.place === place);
  toDeliver.sort((a,b)=>{
    return findNodeLevel(graph, place, a.address) - findNodeLevel(graph, place, b.address);
  })
  if (route.length == 0) {
    parcel = toPickup.length !== 0 ? toPickup[0] : toDeliver[0];
    if (toPickup.length !== 0) {
      route = findShortestPath(graph, place, parcel.place);
    } else {
      route = findShortestPath(graph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// figure out how to prioritize picking up parcels over delivering them:
// Example: pick up all parcels as the first priority, after you have them
// then make delivering them the priority. DONE!!

compareRobots(village, BFSRobot, [], routeRobot, mailRoute) // WORKS!!

/*
  FINISHED!!! 
  The BFSRobot is now faster than the goalOrientedRobot when delivering
  5 packages, (~13.5 vs ~15 steps) && 100 packages (~27 vs ~31.5 steps) up to 100000
  packages (~28 v 33 steps). 

  FINISHED!!! 
  Another idea to make this robot faster is
  to sort the packages that are to be picked up by how close they are to the robot
  currently instead of blindly going to whatever package comes first in the not
  picked up list. You can do this by using the node's level (# of steps away from current
  point) to sort the packages.

  This makes the robot about 3 steps faster than it was previously:
  (~12 v 13.5 steps) for 5 packages
  (~24 v 27 steps) for 100 packages

  ** current algorithm is very slow when running for 100000 packages **

*/

function findNodeLevel(graph, start, target) {
  let level = {[start]: 0};
  let parent = {[start]: null};
  let i = 1;
  let frontier = [start];
  while (frontier.length !== 0){
    let next = [];
    for(let u of frontier){
      for(let v of graph[u]){
        if (level[v] === undefined){
          level[v] = i;
          parent[v] = u;
          next.push(v);
        }
        if (v === target){
          return i;
        }
      }
    }
    frontier = next;
    i += 1;
  }
}

