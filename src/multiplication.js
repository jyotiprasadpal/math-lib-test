'use strict';

var mathlib = require('./mathlib');

mathlib.multiplication = (function(){
    function multiply(a, b){
        return a*b;
    }
  
    return {
        multiply: multiply    
    };
}());

module.exports = mathlib.multiplication;