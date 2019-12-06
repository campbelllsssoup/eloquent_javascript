// Exercise 9-2: Quoting Style : DONE!!!

/*
    Imagine you have written a story and used single quotations marks
    throughout to mark pieces of dialogue. Now you want to replace all 
    the dialogue quotes with double quotes, while keeping the single
    quotes used in contractions like "aren't".

    Think of a pattern that distinguishes these two kinds of quote usage
    and craft a call to the replace method that does the proper replacement.
*/

let text = `It will probably make you feel a bit better about yourself that Tolstoy’s 
goals didn’t always go to plan. In fact, they rarely did. Some days he kept to his 
regime and rules, but on others he did 'nothing', 'almost nothing', did things 'badly', 
'read Gogol' or 'overslept.' However, perhaps without setting his expectations so high 
he never would have created the literary masterpieces he did. Its'.`;

let replaceSingleQuotes = /'(.*?)'/g;

console.log(text.replace(replaceSingleQuotes, function(match, g1){
  console.log("------------")
  return `"${g1}"`;    
}));

