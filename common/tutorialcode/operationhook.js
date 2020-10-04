'use strict';

module.exports = function(Region) {
  //operation hooks
  Region.observe("before save", function(ctx, next) {
    if(ctx.instance && ctx.intance.cityId) {
      return Region.app.models.City.count({ id:
      ctx.instance.cityId }).then (
        res => {
          if (res < 1) {
            var err = {
              statusCode: "400",
              message: "Error adding region to invalid city"
            };
            return Promise.reject(err);
          }
        }
      );
    }
    return next();
  });
}
