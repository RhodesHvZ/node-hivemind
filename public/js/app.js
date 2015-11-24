/* global angular */
var hvz = angular.module('hvz', [
  'ngRoute',
  'hvzControllers',
  'anvil'
])

hvz.config(['$routeProvider', 'AnvilProvider',
  function ($routeProvider, AnvilProvider) {
    AnvilProvider.configure({
      issuer: 'https://connect.example.com',
      client_id: '7625db29-00d5-4c1a-856c-98094cad1f9e',
      redirect_uri: 'http://client.example.com:3000/callback',
      display: 'popup'
    })

    $routeProvider
    .when('/', {
      templateUrl: 'partials/org.html',
      controller: 'OrgController'
    })
    .when('/:orgName', {
      templateUrl: 'partials/games_list.html',
      controller: 'GamesController'
    })
    .otherwise({
      redirectTo: '/'
    })
  }
])

var hvzControllers = angular.module('hvzControllers', ['ui.bootstrap'])

hvzControllers.controller('LoginController', function ($scope, $uibModalInstance, items) {
  $scope.items = items
  $scope.selected = {
    item: $scope.items[0]
  }
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item)
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel')
  }
})

hvzControllers.controller('MainController', ['$scope', '$uibModal', '$http', 'Anvil',
  function ($scope, $uibModal, $http, Anvil) {
    // $scope.animationsEnabled = true
    // $scope.items = ['item1', 'item2', 'item3']

    $scope.login = function () {
      Anvil.authorize()
      .then(function (data) {
        console.log(data)
      })
      .catch(function (err) {
        console.log(err)
      })
    }

    // $scope.login = function (size) {
    //   var modalInstance = $uibModal.open({
    //     animation: $scope.animationsEnabled,
    //     templateUrl: 'ng-script/loginModal.html',
    //     controller: 'LoginController',
    //     size: size || 'sm',
    //     resolve: {
    //       items: function () {
    //         return $scope.items
    //       }
    //     }
    //   })
    //   modalInstance.result.then(function (selectedItem) {
    //     $scope.selected = selectedItem
    //   })
    // }
  }
])

hvzControllers.controller('GamesController', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    $scope.orgName = $routeParams.orgName
  }
])

hvzControllers.controller('OrgController', ['$scope', '$http',
  function ($scope, $http) {
  //
  }
])
