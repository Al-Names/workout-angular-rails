 function MainCtrl($scope, workouts) {
  
  $scope.workouts = workouts.workouts;

  $scope.addWorkout = function() {
    if(!$scope.title || $scope.title === '') { return; }

    $scope.workouts.push({
      title: $scope.title
    });
    $scope.title = '';
  };
}

 angular 
  .module('app')
  .controller('MainCtrl', MainCtrl);