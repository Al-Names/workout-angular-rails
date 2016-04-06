angular
  .module('app', ['ui.router', 'templates', 'Devise'])
  // .directive('addExercise', function() {
  //   return {
  //     template: '<input placeholder="Exercise" name="exercise" ng-model="exercise" type="text" class="validate" required="required">'
  //   };
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







