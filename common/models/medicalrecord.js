'use strict';

const util = require("util");
const wait = util.promisify(setTimeout);

module.exports = function(Medicalrecord) {
  // remote method
  Medicalrecord.revEngine = function(sound, cb) {

    cb(null, 'Selamat datang, ' + sound);
  };
  Medicalrecord.remoteMethod(
    'revEngine',
    {
      accepts: [{arg: 'sound', type: 'string'}],
      returns: {arg: 'MENYAPA...', type: 'string'},
      http: {path:'/OIKKK!!!', verb: 'post'}
    }
  );

  // remote method before hooks
  Medicalrecord.beforeRemote('revEngine', function(context, unused, next) {
    console.log('Memulai...');
    next();
  });

  // afterInitialize is a model hook which is still used in loopback
  Medicalrecord.afterInitialize = async function() {
    // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
    try {

      console.log('> afterInitialize triggered');
      console.time("Process ended");
      await wait(3000);
      console.timeEnd("Process ended");
      return 'done';

    } catch(error) {
      console.error(error)
    }

  };

  // the rest are all operation hooks
  // - http://docs.strongloop.com/display/public/LB/Operation+hooks
  Medicalrecord.observe('before save', function(ctx, next) {
    console.log('> before save triggered:', ctx.Model.modelName, ctx.instance ||
      ctx.data);
    next();
  });
  Medicalrecord.observe('after save', function(ctx, next) {
    console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
    next();
  });
  Medicalrecord.observe('before delete', function(ctx, next) {
    console.log('> before delete triggered:',
      ctx.Model.modelName, ctx.instance);
    next();
  });
  Medicalrecord.observe('after delete', function(ctx, next) {
    console.log('> after delete triggered:',
      ctx.Model.modelName, (ctx.instance || ctx.where));
    next();
  });

  // remote method after hook
  Medicalrecord.afterRemote('revEngine', function(context, remoteMethodOutput, next) {
    console.log('Ups, selesai.');
    next();
  });

  // model operation hook
  Medicalrecord.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      console.log('Mari kita simpan...', ctx.instance);
    } else {
      console.log('Mari kita update... %j:', ctx.where);
    }
    next();
  });
};



/*THIS ONE!!!!
module.exports = function(Medicalrecord) {

  // standard set of validators
  Medicalrecord.validatesUniquenessOf('bloodType', {
    message: 'medicalTreatmentFee is not unique'
  });

  //custom validator
  Medicalrecord.validate('nameOfDisease', customValidator, {
    message: 'Bad Name'
  });
//
  function customValidator(err) {
    if (this.nameOfDisease === 'nameOfDisease') err ();
  };


  // override built-in CRUD function
  Medicalrecord.on('dataSourceAttached', function(obj){
    Medicalrecord.deleteById = function(id, cb) {
      console.log("override! ");
      cb(null);
    }
  });

};
*/





// //remote hook
// module.exports = function(Medicalrecord) {
//
//   Medicalrecord.sayMyName = function(firstName, callback) {
//     callback(null, firstName);
//   }
//   Medicalrecord.beforeRemote('sayMyName', function(context, unused, next){
//     console.log('putting in the car key, starting the engine.');
//     next();
//   });
//
//   Medicalrecord.afterRemote('sayMyName', function(context, finalOutput, next) {
//     console.log('This is the after remote hook running');
//     next();
//   });
//
//
// };
