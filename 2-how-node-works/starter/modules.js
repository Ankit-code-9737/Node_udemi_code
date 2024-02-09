// console.log(arguments);
// console.log(require ("module"). wrapper);


// Modeles Expot 
const C = require("./text-modules-1");
const calc1 = new C();
console.log(calc1.multiply(2, 5));


// Exports 
const calc2 = require("./text-modules-2")
console.log(calc2.divide(10, 2));

// caching 

require("./text-modules-3")();