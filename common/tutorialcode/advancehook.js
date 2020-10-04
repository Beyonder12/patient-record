'use strict';
//remote hook
module.exports = function(Patient) {

  Member.sayMyName = function(firstName, callback) {
    callback(null, firstName);
  }
  Patient.beforeRemote('sayMyName', function(context, unused, next){
    console.log('putting in the car key, starting the engine.');
    next();
  });

  Patient.afterRemote('sayMyName', function(context, finalOutput, next) {
    console.log('This is the after remote hook running');
    next();
  });

//operation hook
  Member.observe('after save', function(context, next) {
  //conditional if update and response body count > 0
    if((context.inNewInstance === undefined) && (context.info.count>0)) {
      console.log('you need to update some other collection');
    }

    next();

};
