// 'use strict';
//
// module.exports = function(Region) {
//   //operation hooks
//   Region.observe("before save", function(ctx, next) {
//     if(ctx.instance && ctx.intance.cityId) {
//       return Region.app.models.City.count({ id:
//       ctx.instance.cityId }).then (
//         res => {
//           if (res < 1) {
//             var err = {
//               statusCode: "400",
//               message: "Error adding region to invalid city"
//             };
//             return Promise.reject(err);
//           }
//         }
//       );
//     }
//     return next();
//   });
// }

Member.observe('after save', function(context, next) {
//conditional if update and response body count > 0
  if((context.inNewInstance === undefined) && (context.info.count>0)) {
    console.log('you need to update some other collection');
  }

  next();
});
