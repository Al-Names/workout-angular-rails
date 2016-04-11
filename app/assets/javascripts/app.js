angular
  .module('app', ['ui.router', 'templates', 'Devise', 'ngResource'])
  .directive('addExercise', function() {
    return {
      templateUrl: 'workout/_workoutForm.html'
      // link: function($scope, element, attrs) {
      //   $scope.clickMe = function() {
      //     $scope.workouts.push("hello");
      //   }
      // }
    }
  })
  // .factory('Workout', function($resource){
  //   return $resource('/workouts/:id', { id: '@id'},
  //     {update: {method: 'PUT'}});
  // })
  .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  })
//   .factory("Workout", function($resource) {
//     return $resource("/workouts/:id.json"), { id: "@id"}, {
//     'create':  { method: 'POST' },
//     'index':   { method: 'GET', isArray: true },
//     'show':    { method: 'GET', isArray: false },
//     'update':  { method: 'PUT' },
//     'destroy': { method: 'DELETE' }
//   };
// })
//   .directive( 'editInPlace', function() {
//   return {
//     restrict: 'E',
//     scope: { value: '=' },
//     template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
//     link: function ( $scope, element, attrs ) {
//       // Let's get a reference to the input element, as we'll want to reference it.
//       var inputElement = angular.element( element.children()[1] );
      
//       // This directive should have a set class so we can style it.
//       element.addClass( 'edit-in-place' );
      
//       // Initially, we're not editing.
//       $scope.editing = false;
      
//       // ng-click handler to activate edit-in-place
//       $scope.edit = function () {
//         $scope.editing = true;
        
//         // We control display through a class on the directive itself. See the CSS.
//         element.addClass( 'active' );
        
//         // And we must focus the element. 
//         // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
//         // we have to reference the first element in the array.
//         inputElement[0].focus();
//       };
      
//       // When we leave the input, we're done editing.
//       inputElement.prop( 'onblur', function() {
//         $scope.editing = false;
//         element.removeClass( 'active' );
//       });
//     }
//   };
// })
//   .directive("clickToEdit", function () {
//     var editorTemplate = '' +
//         '<div class="click-to-edit">' +
//             '<div ng-hide="view.editorEnabled">' +
//                 '{{value}} ' +
//                 '<a class="button" ng-click="enableEditor()">Edit</a>' +
//             '</div>' +
//             '<div ng-show="view.editorEnabled">' +
//                 '<input type="text" class="small-12.columns" ng-model="view.editableValue">' +
//                 '<a class="button" href="#" ng-click="save()">Save</a>' +
//                 ' or ' +
//                 '<a class="button" ng-click="disableEditor()">cancel</a>' +
//             '</div>' +
//         '</div>';

//     return {
//         restrict: "A",
//         replace: true,
//         template: editorTemplate,
//         scope: {
//             value: "=clickToEdit",
//         },
//         link: function (scope, element, attrs) {
//             scope.view = {
//                 editableValue: scope.value,
//                 editorEnabled: false
//             };

//             scope.enableEditor = function () {
//                 scope.view.editorEnabled = true;
//                 scope.view.editableValue = scope.value;
//                 setTimeout(function () {
//                     element.find('input')[0].focus();
//                     //element.find('input').focus().select(); // w/ jQuery
//                 });
//             };

//             scope.disableEditor = function () {
//                 scope.view.editorEnabled = false;
//             };

//             scope.save = function () {
//                 scope.value = scope.view.editableValue;
//                 scope.disableEditor();
//             };

//         }
//     };
// })
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home/_home.html',
          controller: 'MainCtrl'
        })

        .state('home.favorites', {
          url: '/favorites',
          templateUrl: 'favorites/_home.html',
          controller: 'FavoriteCtrl'
        })

        .state('workouts', {
          url: '/workouts',
          templateUrl: 'workout/_workout.html',
          controller: 'WorkoutCtrl',
          resolve: {
            workoutPromise: ['workouts', function(workouts){
              return workouts.getAll();
            }]
          }
        })

        .state('create', {
          url: '/new',
          templateUrl: 'workout/_workoutNew.html',
          controller: 'WorkoutCtrl',
          resolve: {
            workoutPromise: ['workouts', function(workouts){
              return workouts.getAll();
            }]
          }
        })

        .state('workouts.show', {
          url: '/{id}',
          templateUrl: 'workout/_workoutShow.html',
          controller: 'WorkoutCtrl',
          resolve: {
            workoutPromise: ['workouts', function(workouts){
              return workouts.getAll();
            }]
          }
          // resolve: {
          //   categoryPromise: ['categories', function(categories){
          //     return categories.getAll();
          //   }]
          // }
        })

        .state('edit', {
          url: '/edit/{id}',
          templateUrl: 'workout/_workoutEdit.html',
          controller: 'WorkoutCtrl',
          resolve: {
            workoutPromise: ['workouts', function(workouts){
              return workouts.getAll();
            }]
          }
        })

        .state('login', {
          url: '/login',
          templateUrl: 'auth/_login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        })
        
        .state('register', {
          url: '/register',
          templateUrl: 'auth/_register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        });

        // .state('categories', {
        //   url: '/categories',
        //   templateUrl: 'category/_category.html',
        //   controller: 'CategoryCtrl',
        //   resolve: {
        //     categoryPromise: ['categories', function(categories){
        //       return categories.getAll();
        //     }]
        //   }
        // })

        // .state('categories.show', {
        //   url: '/{id}',
        //   templateUrl: 'category/_categoryShow.html',
        //   controller: 'CategoryCtrl',
        //   resolve: {
        //     categoryPromise: ['categories', function(categories){
        //       return categories.getAll();
        //     }]
        //   }
        // });

      $urlRouterProvider.otherwise('home');
    }])







