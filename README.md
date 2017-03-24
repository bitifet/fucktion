Fucktion
========

> Allow to operate promise and non-promise values directly.

  * Do you have a synchronous function which operates only on scalar values and
doesn't understand about promises?

  * Do you want to operate promises or mix
promises with other scalar values thought it?

**Fuck it!!!**

    var fucked_myFunc = fucktion.sync(myFunc);
    var rsult = fucked_myFunc("foo", Promise.resolve("bar"), ...); 


How it works?
-------------

### Install

    npm install --save fucktion


### Usage

    var fucktion = require("fucktion");

    var fn_promise = fucktion.promise(fn); // Returns promisory.
    var fn_cbk = fucktion.cbk(fn); // Returns async function (adds callback parameter).
    var fn_sync = fucktion.sync(fn); // Returns "deasync"ed function..


### Example

    var fucktion = require("fucktion");

    var max = fucktion.sync(Math.max);

    setTimeout(function(){
        console.log("...note that Event Loop was not stopped...");
    }, 2000);

    console.log ("And the maximum increased by 5 is....");
    var m = max(
        10                      // Scalar value.
        , Promise.resolve(23)   // Resolved promise.
        , 44                    // Another scalar value.
        , Promise.resolve(7)    // Another resolved promise.
        , new Promise(          // Pending promise.
            function(resolve, reject){
                setTimeout(function(){
                    resolve(37)
                }, 3000);
            }
        )
    );

    console.log(m + 5);

    console.log ("Done!!");


**Output:**

    And the maximum increased by 5 is....
    ...note that Event Loop was not stopped...
    49
    Done!!


