/*  Chapter 22 Notes - Javascript and Performance
  Start time: 1840h 8-9-20
  End time: 2152h 8-10-20

  0. Topic Overview
      i. rewrite inner loops to avoid expensive operations
      ii. write code that does less work
      iii. hot code compilation makes code more efficient
        a. gathers info about frequently used blocks of code
        b. allows engine to compile faster based on expecations derived from
           the compiler's observations of code execution.
  
  I. Definitions
    A. Staged compilation
      i. an alternative to classic compilation
      ii. breaks the process into different stages for different needs
        a. need to load fast? - cheap compilation (no optimizations)
        b. is the code consistent? - optimized compilation after using expensive
           algo to derive expectations for next run.
    
    B. Force-Directed Graph Layout
      i. nodes in g are also points in a plane,, all of which are statically 
         charged & repel or attract each other.
    
    C. Function Inlining
      i. when the complier stores a separate function's definition along with 
         the outer function from which it's being called.
      ii. allows compiler to avoid unnecessary memory allocations
    
    D. Garbage Collection
      i. a subroutine that deallocates memory once a binding is no longer 
         accessible.
      ii. there are various implementations of gc, generational garbage 
          collection is one.

    E. Hot code
      i. code that is evaluated many times in the program's life

    F. Planar Graph
      i. graph that can form a plane
    
    G. Acyclic graph
      i. graph with no directed cycles - nodes may not point back to themselves
    
    H. Hooke's Law
      i. "the strain in a solid is proportional to the applied stress within the
          elastic limit of that solid."
      ii. "the displaceent or size of the deformation is directly proportional
          to the deforming force or load."

    I. Coulomb's Law
      i. describes electrostatic attraction or repulsion between two objects
      ii. 'like charges repel with a force proportional to the product of the 
          charges'
      iii. 'opposite charges attract with a force inversely proportional to the
            square of the distance between them'
      
    J. Vector Normalization
      i. allows you to resize vectors while keep their direction and proportion
          intact.
      
    K. Micro-optimization
      i. meticulous tuning of code in order to address a perceived deficiency in
          some aspect of it's performance.
    
    L. Profiler
      i. profiles performance of your code, returns data that traces execution
          and data concerning it.


    II. Intro
        i. running lang on machine requires bridging the gap between prog lang
        and instruction format on machine.
        ii. c++/Rust (pre-compiled), mapped to machine instructions closely
        iii. JS/Ruby (JIT compiled), not so much - designed for ease of use
        iv. understanding compilation, benchmarking, and solid refactoring 
            techniques == fast code
        
    III. Staged Compilation
        i. JS compilers compile more than once, typically continuously
        ii. JS engines are fast due to the optimizations made to it's compilation
            process.
          a. 'hot code' that's used often is compiled to lead to faster operations
          b. compiler observes code over time to determine which blocks should
              be compiled using a more expensive algorithm (this algorithm leads
              to optimizations that result in lower runtimes)

    IV. Graph Layout
      A. Pictures of graphs describe:
        i. road systems
        ii. networks
        iii. control flow in a program
        iv. decision tree
      B. Graph layout
        i. ('') - picture assembled from graph data
        ii. best understood when uncluttered
        iii. no solution to reliably construct decent-looking graph from 
              arbitrary data
        iv. layouts from densely connected graphs are hardest to construct
      C. Force-Directed Graph Layout
        i. reliable layout solution for planar graphs
        ii. keep node count less than 200 for uncluttered graphs
        iii. treat edges like springs and nodes like charged particles
    
    V. Defining a Graph
      A. Our Example
        i. Graph consists of GraphNode objects
          a. props: pos<Vec>, edges<arr>
          b. methods: #connect<GraphNode>, #hasEdge<GraphNode>
      B. Connecting Nodes
        i. Using recursive function to build a tree graph
        ii. tree-shaped graphs never contain cycles
      
    VI. Force-Directed Layout
        i. lay nodes out one-by-one based on forces acting on them
        ii. exerts a force poportional to diff btwn spring's restLen & curLen
      A. Hooke's Law
        i. (See VI._.ii && I.H)
      B. Coulomb's Law
        i. when two nodes are close, the repulsion force is larger
        ii. think similarly charged magnetic forces
        iii. (See I.I)
      C. Our Example
        i. to calc force on a node, loop thru all others & apply repel force to
            each
        ii. if other node shares edge w/ curNode, apply springForce
        iii. Read Chapter section + read code for grokking purposes.
    
    VII. Avoiding Work
      A. Cut out unnecessary blocks of work
      B. Avoid iterators - they're more expensive on certain JS engines
      C. (in animation, games, etc.) - skip calcs that have marginal effects
      D. Avoid 'double work'
      E. 'Batch' your work where you can

    VIII. Profiling
      A. Micro-Optimization
        i. ('') - tune inner workings of code for efficiency's sake
        ii. to figure out what to change, observe execution using a profiler
        iii. must measure results in order to make modifications - 
        iv. without solid data, no solid inferences - you're just grasping at 
            straws
      B. Profiler
        i. a tool available in the browser's devTools
        ii. shows which function calls & sub-routines took the most time in the
            'bottom up' section
        iii. 'self time' the time control was in the func's main scope
        iv. 'total time' the time control was in the func's or invoked func's
              scope
        v. 'gc' (garbage collector) - deallocates mem once vars no longer in use
      
    IX. Function Inlining
        i. ('') - including invoked func's defs with the outer func's def in mem
        ii. compiler does this automatically
        iii. speeds up performance due to boosted analysis & easier mem access
        iv. avoids extra mem storage required when invoking foreign funcs w/o
            inlining
        v. also helps compilers avoid conflicting instructions for a similarly
            named func

    X. Creating Less Garbage
        i. in our example, doing vec computations w/o Vec class saves on extra 
        mem alloc
        ii. ALWAYS avoid unnecessary class creation / usage

    XI. Garbage Collection
        i.('') - see VIII.B.v
      A. Why was the Vec class code so slow?
        i. when you use classes, you must use more mem space to store methods,
            props in diff mem addys
        ii. accessing these methods are more expensive than calculating using
            plain primitives
        iii. this is because when using primitives as we have, less garbage is
            created, saving the gc a chunk of effort.
      B. Generational Garbage Collection
        i. one technique to optimize storing long-lived objects
        ii. make gc cheapter, increases cost of writing to older objects
      
    XII. Dynamic Types
        i. method lookup based on a val's type in JS
        ii. binding's value's type is remembered by compiler for efficiency
      A. Types can change
        i. optimization will be fail if you change type of val a binding holds
        ii. makes method lookup more expensive due to ambiguous typing
        iii. compiler must determine val's type before looking up methods
        iv. engine may deoptimize completely or establish a new type case for
            the func's exec
        v. inconsistent typing could 'poison' optimized code (cause 
            deoptimizations to stick around longer)
      B. Moral of the Story
        i. Maintain consistent types in all dynamically typed langs

    XIII. Summary
      A. Avoid unnecessary work
        i. avoid repeated calculations (work that could be batched)
        ii. avoid using Iterators
        iii. skip work that causes marginal amounts of change
      B. Micro-Optimizing
        i. profile first, micro-optimize later
          a. observe most expensive tasks
          b. make educated modifications
      C. Avoid unnecessary class usage (& mem usage)
      D. Avoid unnecessary dependency usage
      E. Use consistent datatypes for each binding's value

*/


