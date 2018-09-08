'use strict';

var mathlib = require('./mathlib');

mathlib.addition = (function(){
    function add(a, b){
        return a+b;
    }
  
    return {
        add: add    
    };
}());

module.exports = mathlib.addition;