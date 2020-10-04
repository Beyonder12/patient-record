'use strict';



// //remote hook
// module.exports = function(Patient) {
//
//   Patient.sayMyName = function(firstName, callback) {
//     callback(null, firstName);
//   }
//   Patient.beforeRemote('sayMyName', function(context, unused, next){
//     console.log('putting in the car key, starting the engine.');
//     next();
//   });
//
//   Patient.afterRemote('sayMyName', function(context, finalOutput, next) {
//     console.log('This is the after remote hook running');
//     next();
//   });
//
//
// };



/* USE THIS!!!*/
module.exports = function(Patient) {
//get total asset amount tied to this Patient
Patient.getMedicalrecordAmountForPatient = function(id, cb) {
  var filter = {
    include: {
      relation: 'medicalrecords',
      scope: {
        fields: ['medicalTreatmentFee']
      }
    }
  };



//promise
  //use filter to include relation -i.e., inner join and just the fields we dateOfIndetified
  return Patient.findById(id, filter).then(function(pati){
    var patiObj = pati.toJSON();
    var totalAmount = 0;
    for (var i=0; i < patiObj.medicalrecords.length; i++) {
      totalAmount += patiObj.medicalrecords[i].medicalTreatmentFee;
    }
    return totalAmount;
  }).catch(function(err) {
    console.log(err);
  });
}




///traditional function
//   Patient.findById(id, filter, function(err, pati) {
//     if(err) {
//       //do something better than this!
//       console.log(err);
//     }
//     var patiObj = pati.toJSON();
//     var totalAmount = 0;
//     for (var i=0; i < patiObj.medicalrecords.length; i++) {
//       totalAmount += patiObj.medicalrecords[i].medicalTreatmentFee;
//     }
//     cb(null, totalAmount);
//   });
//
// };

//remote methods
//A remote method is a static method of a model, exposed over
//a custom REST endpoint.

//
// module.exports = function(Person){
//
//     Person.greet = function(msg, cb) {
//       cb(null, 'Greetings... ' + msg);
//     }
//
//     Person.remoteMethod('greet', {
//           accepts: {arg: 'msg', type: 'string'},
//           returns: {arg: 'greeting', type: 'string'}
//     });
// };

//remote method can also return a promise instead
// of using the callback parameter

// module.exports = function(Person){
//
//     Person.greet = async function(msg) {
//         return 'Greetings... ' + msg;
//     }
//
//     Person.remoteMethod('greet', {
//           accepts: {arg: 'msg', type: 'string'},
//           returns: {arg: 'greeting', type: 'string'}
//     });
// };

// Patient.beforeRemote ('create', function (context, modelInstance, next) {
//   let title = context.req.body.title;
//   let result = "mr " + title ;
//
//   if (isNaN(result)) {
//     next(new Error(result));
//   }
//   context.req.body.title = title;
//   next();
// });



/* AND THIS ONE!!*/
Patient.remoteMethod('getMedicalrecordAmountForPatient', {
  description: "Returns the medicalrecord amount for the patient",
  accepts: {
    arg: 'id',
    type: 'string',
    required: true
  },
  http: {
    path: '/:id/getMedicalrecordTotalForPatientt',
    verb: 'get'
  },
  returns: {
    arg: 'amount',
    type: 'number'
  }
});

};
