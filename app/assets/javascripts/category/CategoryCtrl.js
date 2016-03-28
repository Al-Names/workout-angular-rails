 function CategoryCtrl($scope, $state, $stateParams, categories) {
  
  $scope.categories = categories.categories;

  $scope.id = $state.params.id;

  // $scope.destroy = function(category) {
  //     categories.destroy(category);
  // };

  $scope.addCategory = function() {
    if(!$scope.name || $scope.name === '') { return; }

    categories.create({
      name: $scope.name,
    });
    $scope.name = '';
  };

};


angular
  .module('app')
  .controller('CategoryCtrl', CategoryCtrl);