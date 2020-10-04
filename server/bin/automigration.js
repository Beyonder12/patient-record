var app=require('../server');

//this loads the accountDB configuration in ~/server/datasource.json
var dataSource = app.dataSources.mongodb;

// this automigrates the models
dataSource.automigrate('Medicalrecord', function(err) {
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('Patient', function(err) {
  if (err) throw err;
  dataSource.disconnect();
});

// dataSource.isActual(models, function(err, actual) {
//   if (!actual) {
//     dataSource.autoupdate(models, function(err, result) {
//       if (err) throw err;
//       dataSource.disconnect();
//     });
//   }
// });
