angular.module('app')
.factory('categories', ['$http', function($http){
  var o = {
    categories: []
  };

   o.getAll = function() {
    return $http.get('/categories.json').success(function(data){
      angular.copy(data, o.categories);
    });
  };

  o.create = function(workout) {
    return $http.post('/categories.json', workout).success(function(data){
      o.categories.push(data);
    });
  };

  o.get = function(id) {
    return $http.get('/categories/' + id + '.json').then(function(res) {
      return res.data;
    });
  };

  o.addCategory = function(id, category) {
    return $http.post('/categories/' + id + '/categories.json', category);
  };

  // o.upvote = function(category) {
  //   return $http.put('/categories/' + category.id + '/upvote.json')
  //     .success(function(data){
  //       category.upvotes += 1;
  //     });
  // };

  // o.downvote = function(workout) {
  //   return $http.put('/workouts/' + workout.id + '/downvote.json')
  //     .success(function(data){
  //       workout.downvotes += 1;
  //     });
  // };

  o.destroy = function(category) {
    return $http.delete('/categories/' + category.id + '.json').success(function(data) {
      o.categories.splice(o.categories.indexOf(category), 1);
    });
  };

  return o;
}])