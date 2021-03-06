angular
  .module('app', ['ui.router', 'templates', 'Devise'])

  .directive('addExercise', function() {
    return {
      templateUrl: 'workout/_workoutForm.html'
    }
  })

  .filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
  })

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

        // .state('home.favorites', {
        //   url: '/favorites',
        //   templateUrl: 'favorites/_home.html',
        //   controller: 'FavoriteCtrl'
        // })

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
        })

        .state('workouts.edit', {
          url: '/edit/{id}',
          templateUrl: 'workout/_workoutEdit.html',
          controller: 'WorkoutCtrl',
          resolve: {
            workoutPromise: ['workouts', function(workouts){
              return workouts.getAll();
            }]
          }
        })

        // .state('addExercise', {
        //   url: '/{id}/add',
        //   templateUrl: 'workout/_workoutAddExercise.html',
        //   controller: 'WorkoutCtrl',
        //   resolve: {
        //     workoutPromise: ['workouts', function(workouts){
        //       return workouts.getAll();
        //     }]
        //   }
        // })

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

      $urlRouterProvider.otherwise('home');
    }])
