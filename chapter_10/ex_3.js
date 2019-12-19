// Exercise 10-3: Circular Dependencies : DONE!!!

/*
    A circular dependency is a situation where module A depends
    on B, and B also, directly or indirectly, depends on A. Many 
    module systems simply forbid this because whichever order you
    choose for loading such modules, you cannot make sure that
    each module's dependencies have been loaded before it runs.

    CommonJS modules allow a limited form of cyclic dependencies.
    As long as the modules do not replace their default exports 
    object and don't access each other's interface until after
    they finish loading, cyclic dependencies are okay.

    The require function given in "CommonJS" on page 171 supports
    this type of dependency cycle. 
    
    (1) Can you see how it handles cycles? 
    
    (2) What would go wrong when a module in a cycle does replace 
    its default exports object ?
*/

/*
    1) The way cyclic dependencies are handled when using this syntax 
    is that a dependency must wait to load its' own dependencies 
    before the code is run. This works because 

    2) IF a module replaces the default exports object, then 
    then the dependencies of that module won't load correctly AND
    the interface will not manifest itself how you expect it to.
    
    The golden rule is to just not to export functions / classes
    as default exports, and instead properties to the export object.

*/