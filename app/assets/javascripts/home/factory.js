angular.module('app')
.factory('workouts', [function(){
  var o = {
    workouts: []
  };
  return o;
}])