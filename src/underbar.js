(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n > array.length ? array : array.slice(array.length-n,array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      var i;
      for(i = 0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    else if (typeof collection === 'object'){
      for (var prop in collection){
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function(item, index){
      if (test(item)){
        results.push(item);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(item){
      var output = test(item);
      return !output;
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    var i, j;
    for (i = 0;i<array.length;i++){
      if (results.length === 0){
          results.push(array[i]);
        } else{
          for(j=0;j<results.length;j++){
            if (results[j] === array[i]){
              break;
              } else if (results[j] !== array[i] && j === results.length-1){
                  results.push(array[i]);
            }
              
          }
      }
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(item, index){
      results.push(iterator(item));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
_.reduce = function(collection, iterator, accumulator) {
    var locAcc;
    var noMemo = false;
    var i;
    var isArray = Array.isArray(collection);

    //Checking initial conditions
    //If no starting condition and isArray
    if (accumulator === undefined ){
      noMemo = true;
    } 
    else{
      locAcc = accumulator;
    }

    if (isArray){

      if (collection.length === 0){
        return true;
      }

      //Conditions: 1) No starting point(accumulator/noMemo)
      //            2) No iterator function e.g. _.every([2,4,6]), _.every([true,false,true])

      // Possibilities, 1&2, just 1, just 2, neither 1 or 2

      //Examples: 1&2) _.reduce([2,4,6])
      //          1) _.reduce([2,4,6], isEven)
      //          2)_.reduce([2,4,6], , 0);
      //          not2not1) ._reduce([2,4,6], function(memo, num){return memo+num}, 10)


      for(i=0; i<collection.length; i++){
        //If any of the values would trigger a false, return false immediately
        if (collection[i] === false || collection[i] === null || collection[i] === undefined){
          return false;
        }
        // C1) If starting value is undefined, set it to the first value in the array
        if (noMemo && arguments[1] === undefined){
          noMemo = false;
          locAcc = collection[i];
        }
        // C2) no starting point, has iterator function
        else if (noMemo){
            noMemo = false;
            locAcc = collection[i];
            i++;
            locAcc = iterator(locAcc, collection[i]);
        }
        // C3
        else if (arguments[1] === undefined){
            locAcc = collection[i]; 
        }
        else {
          locAcc = iterator(locAcc, collection[i]);
        }
    
      }
    } else if (typeof collection === 'object'){

      for(var prop in collection){
        if (collection[prop] === false || collection[prop] === null || collection[prop] === undefined)  {
          return false;
        }
        if (noMemo){
          noMemo = false;
          locAcc = collection[prop];
        } 
        else if (arguments[1] === undefined){
          locAcc = collection[prop];
        } else{
          locAcc = iterator(locAcc, collection[prop]);
        }
      }
    }

    return locAcc;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
  // TIP: Try re-using reduce() here.
   
    return _.reduce(collection, function(wasFound, item){
            if(iterator !== undefined){

              if(typeof(wasFound) === 'boolean'){
                if (!wasFound){
                  return false;
                }
                if(iterator(item)){
                  return true;
                }
              }
              else if(Boolean(iterator(wasFound)) && Boolean(iterator(item))){
                return true;
              }
              else if(collection.length === 1 && Boolean(iterator(wasFound))){
                return true;
              }
              else {
                return false;
              }
            }
            else if(wasFound){
              return true;
            }
            return false;
           });
};


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

  // var oneExists = false;
  // if (collection.length === 0){
  //       return false;
  // }

  //problem, since every checks every single object in collection, a single true 
  // will not break out of the function
  //solution: break the function if a single true is found

  //   _.every(collection, function(memo, item){
  //     if(typeof(memo) === 'boolean' && memo){
  //       oneExists = true;
  //       //only returns out of current iteration, not entire function
  //       return;
  //     }
  //     if(iterator !== undefined){
  //       if (iterator(memo)){
  //         return true;
  //       }
  //       return false;
  //     }
  //   });

  //   return oneExists;
  // };

    var i;
      if (collection.length === 0 ){
        return false;
      }

      for (i=0;i<collection.length;i++){
        if (collection[i] === true || collection[i] === 'yes'){
          return true;
        }
        else if(arguments[1] !== undefined){
          if(iterator(collection[i])){
            return true;
          }
        }
      }

     return false;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var i = 1;
      while(arguments[i] !== undefined){
        for(var prop in arguments[i]){
          obj[prop] = arguments[i][prop];
        }
      i++;
      }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var i = 1;
      while(arguments[i] !== undefined){
        for(var prop in arguments[i]){
          if (!obj[prop] && obj[prop] !== '' && obj[prop] !== 0 && obj[prop] === undefined){
              obj[prop] = arguments[i][prop]; 
          }   
        }
      i++;
      }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.


  _.memoize = function(func) {
    var args;
    var alreadyCalledWithParams = false;
    var result;

    return function(){
      //Function will run once, setting args array to current arguments
      //need to check if new arguments equal old arguments 

      if(args !== undefined){ 

        console.log('Args in parameter check: ' + args + ' Length: ' + args.length);
        var tempNewArgs = Array.prototype.slice.call(arguments);
        // Need to check if items are primitive or a reference(array)
        var argsHasArray = false;
        _.each(tempNewArgs, function(item){
          if (Object.prototype.toString.call(item) === '[object Array]'){
            argsHasArray = true;
          }
        });
       console.log('argsHasArray: ' + argsHasArray);

       //If argument is array, check array for same arguments as prev
       // check all inputs
       if (argsHasArray){
        //First array in arguments
        _.each(tempNewArgs, function(item, index){
          //First number in first array in arguments
          _.each(item, function(item2, index2){
            //console.log('item2: ' + item2 + ' args[index]: ' + args[index][index2]);
            if(item2 !== args[index][index2]){
              alreadyCalledWithParams = false;
            }
            if(i === item.length){
              alreadyCalledWithParams = false;
            }
          });
        });   
      }
        //Check to see if the arguments are the same as previous arguments (if primitive)
       else{ 
          for (var i = 0; i<args.length;i++){
             if(args[i] !== tempNewArgs[i]){
               alreadyCalledWithParams = false;
             }
             if(i === args.length){
               alreadyCalledWithParams = false;
             }
          } 
      }
    }  
      //If arguments are not the same as prev arguments, run new function with new args
      if(!alreadyCalledWithParams){
        var j = 0;
        //Store arguments of current function in closure scope variables
        args = [];
        args = Array.prototype.slice.call(arguments);
        //console.log('Args in function set: ' + args + ' Length: ' + args.length);
        result = func.apply(this, arguments);
        alreadyCalledWithParams = true;
      }
      return result;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //TODO: allow variable amount of arguments
    setTimeout(func, wait, arguments[2], arguments[3]);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle= function(array) {
    var refArray = array.slice();
    var i = array.length;
    var j = 0;
    var temp;

    while(i--){
      //Finds a number 0 through the length of the array, 
      //decreasing the scope one from the end with every iteration
      j = Math.floor(Math.random() * (i+1));
       //swaps the value with the randomized index with the last index
      temp = refArray[i];
      refArray[i] = refArray[j];
      refArray[j] = temp;
    }
    return refArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    var results = [];

    var args = Array.prototype.slice.call(arguments);
    var longestArray = 0;

    for(var k =0;k<args.length;k++){
      if(args[k].length>longestArray){
        longestArray = args[k].length;
      }
    }

    // });
    //argument list
    //[i=0 j=0, i=1 j=0, i=2 j=0]
    //[i=0 j=1, i=1 j=1, i=2 j=1]

    for(var j=0;j<longestArray;j++){
      //items in each argument
      results.push([]);
      for(var i=0;i<args.length;i++){
        results[j].push(args[i][j]);
      }
    }
    return results;
  };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
 _.flatten = function(nestedArray, result) {

    var results = [];

    
    var digDeeper = function(element){
        
        if(Array.isArray(element)){
          _.each(element,function(item){
            if (Array.isArray(item)){
              digDeeper(item);
            } 
            else{
              results.push(item);
            }
            
          });
        }
        else{
          results.push(element);
        }
    };

    digDeeper(nestedArray);
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var refArg = arguments[0];
    var args = Array.prototype.slice.call(arguments).slice(1);
    var result = [];
    var truthObject = {};


    //e.g. [1, 2, 3, 4, 5], [5, 2, 10], [3, 2]
    //Start with first array
    //[1, 2, 3, 4, 5]

    _.each(refArg, function(itemInRefArray){
      //sort through all the rest of the arrays
      //[[5, 2, 10], [3, 2]]
      _.each(args, function(argArray,index){
        //Search each array
        if (_.contains(argArray, itemInRefArray)){
          truthObject[itemInRefArray] = (truthObject[itemInRefArray] || 0) + 1;
        }
      });
    });

    for (var prop in truthObject){
      if(truthObject[prop] === args.length){
        result.push(prop);
      }
    }
    console.log(truthObject);
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments).slice(1);
    var allArgs = _.flatten(args);
    var result = [];

    _.each(array, function(item){
      if(!_.contains(allArgs,item))
        result.push(item);
    });

    return result;
  };


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
