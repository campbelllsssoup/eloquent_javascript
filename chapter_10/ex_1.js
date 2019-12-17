// Exercise 10-1: A Modular Robot : DONE!!!

/*
    These are the bindings that the project from Chapter 7
    creates:
    ------------------------------------------------------
    roads
    buildGraph
    roadGraph
    VillageState
    runRobot
    randomPick
    randomRobot
    mailRoute
    routeRobot
    findRoute
    goalOrientedRobot
    ------------------------------------------------------
    If you were to write that project as a modular program:

    1) What modules would you create? 
    
    2) Which module would depend on which other module?
    
    3) What would their interfaces look like?

    4) Which pieces are likely to be available prewritten on NPM?
    
    5) Would you prefer to use an NPM package or write them yourself?
*/

/*
    1) I would create a module called 'simpleGraphRep' that utilizes the 
    buildGraph function. I wouldn't include the roadGraph variable
    beacuse I would want a user to have the ability to initialize it
    so that it makes sense for their use case. Also, I would allow the user
    to define the roads variable because their graph representation may look 
    different than the one for this project.

    I would separate the rest of the bindings / functions above into a separate
    module called 'robotProjectEJS' and it would contain code that is more specific
    to the Chapter 7 Exercises.

    2) The 'robotProjectEJS' module would depend on the 'simpleGraphRep' module.

    3) 'simpleGraphRep' - expose only the buildGraph function. In the readme / description
    I'd describe the format that the function expects so that it can convert an array of edges
    into an adjacency list.

    'robotProjectEJS' - I would include all of the above bindings in the interface, but not allow them
    to be able to be changed, because I want the graph to be able to be represented and people can build
    on top of these solutions to the exercise so that they can (try to) create a faster robot.

    4) The piece of code inside of robotProjectEJS that provides a breadth-first search is likely already
    written on NPM. 

    5) For my first time implementing a BFS, I'd rather build it out myself so that I'm more aware of what 
    the code is doing - but If I had more projects that I'd want to use that logic in I'd rather use 
    an npm package so that I don't have to write the same code continuously and I don't have to always
    think about the exact steps needed to implement a BFS.
*/


