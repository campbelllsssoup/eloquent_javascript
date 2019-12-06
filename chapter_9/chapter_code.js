// Chapter 9 Code / Notes

// 1. Creating a Regular Expression

/*
    Regular Expression - matches patterns in strings and is 
    manifested as a type of object in Javascript.

    Can be instantiated using the constructor syntax (re1)
    or as a literal by surrounding the regex with forward
    slashes (re2).
*/

// CODE
// let re1 = new RegExp('abc');
// let re2 = /abc/;

/*
    In order to include special characters as an actual char
    to match in your regex you must escape the special character.

    Special character examples: . } { ^ ? + * ) ( | - ] [ 
*/

// CODE
// let eighteenPlus = /eighteen\+/;



// 2. Testing for Matches

/*
    RegExp have many different methods available for it to 
    use, one of them is RegExp.prototype.test . What this does
    is tests if there is a match inside of a string, and returns 
    true if there is and false if there is not.
*/

// CODE
// console.log(/abc/.test("abcde")); //=> true
// console.log(/abc/.test("abxde")); //=> false



// 3. Sets of Characters

/*
    To match a set of characters we include a range of characters inside of 
    square brackets. The range is determined by the starting and ending character's
    unicode number.

    Ex: /[0-9]/ will match any digit inside of a string. You could also do this the long 
    way such as /[0123456789]/ - but that's pretty ugly.
*/

// CODE
// console.log(/[0123456789]/.test("in 1992")); //=> true

// console.log(/[0-9]/.test("in 1992")); //=> true

/*
    Shorthand character classes:

    /d - any digit character /[0-9]/ ;
    /w - an alphanumeric character /[(a-z|A-Z|0-9)]/;
    /s - any whitespace character /[(\r|\n|\t|\v|\f| )]/ ;

    ^^ return, newline, horizontal tab, vertical tab, form feed, space chars ^^

    /D - NON-digit character (opposite of /d) /[^0-9]/ ;
    /W - NON-digit character (opposite of /w) /[^(a-z|A-Z|0-9)]/ ;
    /S - NON-digit character (opposite of /s) /[^(\r|\n|\t|\v|\f| )]/ ;
    . - any character except newline ;
*/

// CODE
// let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
// console.log(dateTime.test("01-30-2003 15:20")); //=> true

// console.log(dateTime.test("30-jan-2003 15:20")); //=> false

/*
    The above way we have implemented a test for dateTime is not the
    cleanest implementation - but we'll write a better solution later.

    Shorthand character classes can also be used inside of square brackets,
    but many special characters (such as . + and others) lose their "special
    meaning" when inside of square brackets.

    Another useful tip - you can always invert (or match something that IS NOT
    something else) by using a 'caret' (^) at the in the beginning of a square
    bracket sequence (Be careful because using a caret outside of square brackets
    means something completely different).
*/

// // CODE
// let notBinary = /[^01]/;
// console.log(notBinary.test("1100100010100110")); //=> false

// console.log(notBinary.test("1100100010200110")); //=> true



// 4. Repeating Parts of a Pattern

/*
    In order to match 1 or more instances, you should use a plus sign (+) 
    after the part of the pattern that you intend to repeat.

    In order to match 0 or more instances of a character use an asterisk (*)
    after the pattern you wish to match.

    Example: /\d+/ matches one or more digit chars
*/

// CODE
// console.log(/'\d+'/.test("'123'")); //=> true

// console.log(/'\d+'/.test("''")); //=> false

// console.log(/'\d*'/.test("'123'")); //=> true

// console.log(/'\d*'/.test("''")); //=> true


/*
    A question mark makes a part of a pattern optional, meaning it will
    match whether that section matches zero or one time.

    (Use the '?' as an optional whenever you want to limit * to just zero or
    one instance and NO MORE THAN THAT).
*/

//CODE

// let neighbor = /neighbou?r/;
// console.log(neighbor.test("neighbor")); //=> true

// console.log(neighbor.test("neighbour")); //=> true

// console.log(neighbor.test("neighbouur")); //=> false

/*
    You can also specify precisely how many times a character / 
    subexpression should occur by using the number of times it
    should occur inside curly braces right after the character -
    /\d{2}/ - match the first two digit characters.

    Not only that, you can also specify a range of how many times a 
    character or subexpression should occur by using the following format -
    /\d{2,4}/ - match the first two digit characters or up to four digit
    characters if there are more digits after the first two.

    You can also specify open-ended ranges if you'd like to not have 
    an upper limit - but for lower limits you should include 1 in order
    to indicate a lower min. Doesn't work the same way as max.
*/

// CODE 
// let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;

// console.log(dateTime.test("1-30-2003 8:45")); //=> true

// console.log(dateTime.test("1-30-97 9:14")); //=> false

// console.log(dateTime.test("11-1-1999 23:59")); //=> true

// console.log(dateTime.test("01-5-1665 10:0")); //=> false

// let minElevenNum = /\d{11,}/;
// let maxFiveNum = /\d{1,5}/;
// let minFiveNum = /\d{5,}/;

// console.log(maxFiveNum.test("1234567890")); //=> true
// /* 
//   at first you may think that the above doesn't work correctly and 
//   it should return false because you're testing it on a string that has
//   10 characters - this is incorrect. It's just looking for a pattern
//   to match within the WHOLE STRING - so it matches only the first five
//   digits and returns true and ignores the rest of the string.
//   If you wanted to test whether or not the string contains 10 numerical
//   characters you'd have to run it with /\d{11,}/ - which would return 
//   false 
// */

// console.log(minElevenNum.test("1234567890")); //=> false

// console.log(minFiveNum.test("1234")); //=> false

// console.log(maxFiveNum.test("123")); //=> true 

// console.log(minFiveNum.test("12345")); //=> true



// 5. Grouping Subexpressions

/*
    To use an operator like * or + on more than one character
    (a subexpression) at a time, you should group the characters
    together with a set of parentheses around it.
    
    The subexpression will be counted like one character and you
    can work on it as such.
*/

// CODE

// let cartoonCrying = /boo+(hoo+)+/i;

// console.log(cartoonCrying.test("Boohoooohoohooo")); //=> true
// console.log(cartoonCrying.test("Booho")); //=> false
// console.log(cartoonCrying.test("boooohoooooo")); //=> true
// console.log(cartoonCrying.test("Boho")); //=> false
// console.log(cartoonCrying.test("Boohooalsdjf;a")); //=> true
// console.log(cartoonCrying.test("boohoooohoohooooo")); //=> true
// console.log(cartoonCrying.test('BOOOHOOOHOOHOOO')); //=> true

/*
  the above matches with 'boo' followed by at least a 'hoo' - 'boohoo' -
  but it will also match 'boooohoooooo' && 'boohoooohoohooooo'. It will also
  match 'BOOOHOOOHOOHOOO' because the lower-case i at the end indicates
  that the regex should be case insensitive.
*/



// 6. Matches and Groups 

/*
    In addition to testing whether a string will match with a RegEx by calling
    .test on a RegEx and providing a string as an argument to test - you can also 
    'execute' a regular expression on a string by calling .exec on a RegEx and
    providing a string to search as an argument.

    If no match is found - the .exec method will return null. If a match is found - 
    an object is returned that provides information about the match. 

    The object manifests itself as an array with a single value - but it also has
    attributes such as 'index' which tell you where the first character of the 
    match is and further solidifies the fact that this is indeed an object.

    The match object also contains properties like 'input'.
*/

// CODE 
// let match = /\d+/.exec("one two 100");

// console.log(match); //=> ['100', index: 8, input: 'one two 100', groups: undefined]

// console.log(match.index); //=> 8

/*
    If the RegEx contains subexpressions in the form of groups, then they will
    also match and be available as the 2nd and on entries into the match array.
    The whole match will always be the first element. The next element is the 
    part matched by the first group, the next the second group, and so on.

    Groups are very useful for extracting parts of a string. For example - if
    we not only wanted to test whether a string contains a date but also use
    that string to construct a date object, we'd probably want to use groups
    to extract that data.
*/

// CODE

// let quotedText = /'([^']*)'/; 

// // the regex above matches any text inside of single quotes 
// // that is not an ending quote and matches it until it reaches a single quote - 
// // it also organizes the text inside of single quotes into a group.

// console.log(quotedText.exec("she said 'hello'.")); //=> ["'hello'", 'hello', index: 9, etc..]

/*
    When a group isn't matched at all, it's position in the array will
    be held by an undefined value. 

    Also, if a group is matched multiple times within a string, only the last
    match ends up in the array.
*/

// CODE
// console.log(/bad(ly)?/.exec("lo-bad")); //=> ['bad', undefined, index: 3]
// console.log(/(\d)+/.exec("a123")); //=> ['123', '3', index: 1]



// 7. The Date Class

/*
    Javascript uses the 'Date' class to represent dates. The way that this works
    may seem confusing at first, but we'll go over it so that you become used to it.

    Calling the Date constructor will return the current Time and Date (e.g. DateTime).
    This will likely not be the same as the ACTUAL time in your time zone if you are 
    running this in Node.js - the DateTime is set to UTC time (time in Britain +0000) 
    to avoid confusion. Otherwise, if you're running this in your browser it will 
    return the time at the current time zone that you have your browser set to and/or
    what the browser reads from your computer.

    ALSO, in node.js logging a new Date to the console will output a timestamp in 
    ISO 8601, while in Google Chrome it will output  

    -----
    The following are the arguments you can supply to the Date constructor - with a
    caveat if you supply only one argument.
    
    new Date(y, m, d, h, m, s, ms);

    OR 

    new Date(<ms from Unix Epoch a.k.a. Unix time>);

    unix epoch = 1 January 1970; 

    -----
    COMMON GOTCHAS:

    the months for the Date constructor starts from 0 (Jan) and goes to 11 (Dec) - 
    be mindful of this whenever using the Date constructor. Every other number acts
    normally.

    The last four arguments of Date constructor are set to 0 when they are not
    included.
*/

// CODE
// console.log(new Date()); //=> will output the current time

// console.log(new Date(2009, 11, 9));//=> will output the DateTime of Dec 9, 2009

// console.log(new Date(2009, 11, 9).toDateString()); //=> Wed Dec 09 2009

// console.log(new Date(2009, 11, 9, 12, 59, 59, 999));

/*
    A DateTime / timestamp is stored as an integer that is the number of seconds 
    since the Unix epoch at UTC time. To represent DateTimes before then, you may
    use negative numbers.

    In order to get the unix time of a Date object, you can call .getTime() on it.

    In order to get the current unix time you can call Date.now() OR create a new 
    Date object and call .getTime() on it.

    -----
    In addition to the above methods, you have .getFullYear, .getMonth, .getDate,
    .getHours, .getMinutes, .getSeconds, and .getMilliseconds that you can call on
    a Date object. This can be useful to extract certain parts of a Date that you
    are interested in.

    You can also use .toDateString if you're only interested in the Date.
*/

// CODE
// console.log(new Date(2013, 11, 19).getTime()); //=> 1387440000000 (Number)

// console.log(new Date(1387440000000)); //=> returns a date object that represents Dec 19, 2013

// console.log(Date.now()) //=> returns the current unix time (1575387480630)

// console.log(new Date().getTime()); //=> also returns the current unix time

// console.log(new Date().getTime() === Date.now()) //=> true

// function getDate(string){
//     let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
//     return new Date(year, month - 1, day);
// }

// console.log(getDate("01-30-1997")); //=> returns a Date object for this date



// 8. Word and String Boundaries

/*
    If we want to make sure that a match spans a whole string, we can use the 
    ^ an $ special characters.
    -------
    ^ (outside of square brackets, at beginning of regex) - ensures that
    the character / subexpression to the right BEGINS the string you're executing
    on.
    
    $ (outside of square brackets, at end of regex) - ensures that the character /
    subexpression to its' left ENDS the string you're executing on.

    /b - the start, the end of string, or anyplace where /w occurs on one side and 
    /W on the other
*/

// CODE
// console.log(/cat/.test("concatenate")); //=> true

// console.log(/^cat/.test("concatenate")) //=> false

// 9. Choice Patterns

/*
    If you want to have a subexpression that matches whether it is different strings
    or letters or words in one place, use the pipe (|) operator inside of a parentheses
    grouping.
*/

// let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;

// console.log(animalCount.test("15 pigs")); //=> true
// console.log(animalCount.test("15 chickens")); //=> true
// console.log(animalCount.test("1 cow")); //=> true
// console.log(animalCount.test("15 pigchickens")); //=> false


// 10. The Mechanics of Matching

/*
    Read in book...
*/

// 11. Backtracking

/*
    Read in book...
*/

// 12. The replace Method

/*
    Another method you can use with regular expressions is 'replace' - but this
    is a method that belongs to the String prototype, not the RegExp prototype - 
    so you call replace on a string and not on a RegExp object.

    NOTE: the String.prototype.replace method is non-destructive.
*/

// CODE
// replaces the first occurrence of p with a m.
// console.log('papa'.replace('p', 'm')); //=> 'mapa'

// // replaces all occurences of p with a m.
// console.log('papa'.replace(/p/g, 'm')); //=> 'mama'

// console.log("Borobudur".replace(/[ou]/, "a")); //=> Barobudur

// console.log("Borobudur".replace(/[ou]/g, "a")); //=> Barabadar

/*
    Where the replace method gets really interesting is when you begin to
    use it to re-format text. You can do this by grouping pieces of text into
    groups (use parentheses) and then referring to the groups in the second
    argument of replace by using $1 for the first group, and so on...

    You can do this with up to 9 groups in total, and the whole match can be 
    referred to by using $& 
*/

// CODE
// console.log("Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(/(\w+), (\w+)/g, "$2 $1"));


/*
    You can also pass a function as the second argument to the replace method, 
    and the function will be called for each replacement that occurs.

    Arguments that are passed to this function occur in the following order:

    handleReplace(wholeMatch, group1, group2, .. groupN);

    The replace method will provide these arguments to your custom callback.
*/

// CODE
// let s = "the cia and fbi";

// console.log(s.replace(/\b(fbi|cia)\b/g, function(match){
//     return match.toUpperCase();
// }));

// let stock = "1 lemon, 2 cabbages, and 101 eggs";

// function minusOne(match, amount, item){
//   amount = Number(amount) - 1; // turns the digit string to a number so that you can subtract one, and subtracts one.
//   if (amount === 1){ // format the item to be singular if there's only one left
//     item = item.slice(0, item.length - 1);
//   } else if (amount === 0) {
//     amount = "no";
//   }
//   return amount + " " + item;
// }

// stock = stock.replace(/(\d+) (\w+)/g, minusOne);

// console.log(stock); //=> no lemon, 1 cabbage, and 100 eggs



// 13. Greed

/*
    The ?, *, +, and {} characters are GREEDY, meaning they will
    match as much as they can and then backtrack from there, sometimes
    this will lead to unexpected matches such as on line 514.
*/

// CODE
// function stripComments(code) {
//   return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
// }

// console.log(stripComments("1 + /* 2  */3")); //=> 1 + 3

// console.log(stripComments("x = 10;// ten!")); //=> x = 10;

// console.log(stripComments("1 /* a */+/* b */ 1")); //=> 1 1 (but we want 1 + 1 !)

/*
    In the second option inside of the RegEx (the one that applies for multi-line
    comments) - we use [^]* instead of .* because .* matches only non-newline characters - 
    and in multi-line comments new line characters are allowed (hence "multi-line").

    Unfortunately, for two multi-line comments, everything in between the beginning
    of the first and the end of the last comment is excluded from the result (line 509).

    In order to negate this behavior, you can put a ? after the end of a greedy subexpression
    to make it nongreedy, changing their behavior to match as little as possible, matching
    more only when the remaining pattern does not fit the smaller match.


    Many bugs in regular expressions arise because this behavior isn't deeply considered -
    always think about using the nongreedy operator before greedy operator in your
    regexes.
*/

// CODE
// function stripComments(code) {
//     return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
// }

// console.log(stripComments("1 /* a */+/* b */ 1")) //=> 1 + 1



// 14. Dynamically Creating RegExp Objects

/*
    In some cases, you cannot use literal notation (forward-slashes) to create
    regex objects. One such case is when you only figure out what you're supposed
    to be matching against when the program is run (hence 'dynamically' creating
    RegExp). 

    In these cases you can still use the RegExp constructor notation to create 
    regular expressions and interpolate what you need to check against inside 
    of the string that you supply as an argument to 'new RegExp(<str>)'.

    When using special characters inside of a string, you have to escape them
    ('\\b' instead of \b) so that the interpreter knows you mean to use a regex
    special character. 
    
    Also, the second argument to the RegExp constructor will dictate whether the
    regular expression is global or case-insensitive - you can't introduce these
    things after the regular expression itself like in slash (literal) notation.
*/

// let name = "harry";
// let text = "Harry is a suspicious character.";

// let regexp = new RegExp("\\b(" + name + ")\\b", "gi");

// console.log(text.replace(regexp, "_$1_")); //=> _Harry_ is a suspicious character.

/*
    But, what if a person's name contains characters that are special in regular
    expressions? All we have to do in that case is escape the special characters in
    the person's name and then use that escaped value in the regular expression itself.
*/

// CODE
// let name = "dea+hl[]rd";
// let text = "This dea+hl[]rd guy is super annoying.";
// let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&"); //=> dea\+hl\[]rd (all specialness of characters negated.)
// console.log(escaped);
// let regexp = new RegExp("\\b" + escaped + "\\b", 'gi');
// console.log(text.replace(regexp, "_$&_")) //=> This _dea+hl[]rd_ guy is super annoying.



// 15. The search Method

/*
    You can't call the .indexOf method on a string and provide a regular expression
    as a value to search by - but you can use a method that returns the index of 
    where a match is found by using .search.

    the search method will return the first index on which the expression was found.
    if the expression isn't matched, it will return -1.

    when using the search method, you cannot tell the method to start from a given
    point in the string, which can often be useful.
*/

// CODE
// looks for the first non-whitespace (\S) character in the string and returns the index
// console.log("  word".search(/\S/)); //=> 2
// console.log("    ".search(/\S/)); //=> -1



// 16. The lastIndex Property

/*
    THe exec method provides an "inconveinent" way of starting from a given point in a
    string.

    1) You must include the y (sticky) or g (global) option in the regular expression.

    2) The match must happen through the .exec method.

    3) You have to set the lastIndex property after creating the regular expression obj.

    DIFFERENCE BETWEEN STICKY & GLOBAL:

    If the regular expression is 'sticky', then it will only try to find a match from
    the beginning of the string. 
*/

// CODE
// let pattern = /y.*/g;
// // pattern.lastIndex = 3;
// let match = pattern.exec("xyzzy");
// console.log(match); //=> ['y']
// console.log(match); // without setting lastIndex //=> 'yzzy'
// console.log(match.index); //=> 4
// console.log(pattern.lastIndex); //=> 5
// pattern.lastIndex = 0;
// console.log(pattern.exec("yzzy"));

/*
    after .exec finds a match in the string it will set the lastIndex to the position in the string
    after the match's last string. The index will remain at that point, so if you run .exec
    with a new string it will not start from the beginning of the string. BE WARY OF THIS -
    set lastIndex to 0 after a match in order to ensure desired behavior.
*/


// CODE

// let global = /abc/g;
// console.log(global.exec("xyz abc")); //=> ['abc']

// let sticky = /abc/y;
// console.log(sticky.exec("xyz abc")); //=> null

// let digit = /\d/g;

// console.log(digit.exec("here it is: 1")); //=> ['1']
// // to fix the below execution of the digit regex, set the lastIndex property of the regex
// // to 0
// digit.lastIndex = 0;
// console.log(digit.exec("and now: 1")); //=> null || ['1']


/*
    using the global option when you are calling the .match method on a string
    will return an array of the matches, changing what the .match method usually 
    returns.

    Be careful using global regular expressions - you'll typically only use them in
    calls to .replace and whenever you want to explicity use lastIndex. 
*/

// console.log("Banana".match(/an/)) //=> match object - ['an', index: 1, input: "Banana", groups: undefined]

// console.log("Banana".match(/an/g)) //=> ['an', 'an']


/*
    You can also loop through the matches of a pattern and get its' index by doing
    something similar to the following..
*/

// CODE
// let input = 'A string with 3 numbers in it... 42 and 88.';
// let number = /\b\d+\b/g;
// let match;
// while (match = number.exec(input)) {
//     console.log("Found", match[0], "at index", match.index);
// }
// // Found 3 at index 14
// // Found 42 at index 33
// // Found 88 at index 40


// 16. Parsing an INI File

/*
    An INI file is a configuration file used by Windows programs 
    to initialize program settings.

    The rules for an INI file are as follows:
    -------------------------------------------------------------
    1. Blank lines and lines starting with semicolons are ignored.

    2. Lines wrapped in [ and ] start a new session.

    3. Lines containing an alphanumeric identifier followed by an
    '=' character add a setting to the current selection.

    4. Anything else is invalid.
    -------------------------------------------------------------
    Your task is to convert a string in this INI format into an 
    object whose properties hold strings for settings written before
    the first section header and subobjects for sections, with
    those subobjects holding the section's settings.

*/

function parseINI(string){
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach(line => {
        let match;
        if (match = line.match(/^(\w+)=(.*)$/)) {
            section[match[1]] = match[2];
        } else if (match = line.match(/^\[(.*)\]$/)) {
            section = result[match[1]] = {};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error("Line '" + line + "' is not valid.");
        }
    });
    return result;
}















