'use strict';

angular.module('gifchatApp')
  .controller('ChatroomCtrl', function ($scope, Auth, $firebase, $location) {
  	$scope.username = Auth.getCurrentUser().name
  	$scope.userMessage;
    $scope.newUser;
  	$scope.isLoggedIn = Auth.isLoggedIn;
  	$scope.privateMessage = false;
  	$scope.privateMessageHash;
  	$scope.privateMessageURL;
    $scope.usernameFriend;
    $scope.friendsName;
    $scope.chosenPrivate=false;
    $scope.active=false;
    $scope.added=false;

  	var linkRef = new Firebase("https://fiery-torch-9779.firebaseio.com/usernames/"+$scope.username+ "/" +"messages");
  	var sync = $firebase(linkRef);
  	$scope.messages = sync.$asArray();

  	$scope.addMessage = function(text) {
    	$scope.privateMessages.$add({username: $scope.username, text: text});
      $scope.friendsMessages.$add({username: $scope.username, text: text});
      $scope.userMessage = '';
  	}
    $scope.setFriendUsername = function(user){
      $scope.friendsName = user;
      $scope.chosenPrivate=true;
      var userRef = new Firebase("https://fiery-torch-9779.firebaseio.com/usernames/" + $scope.username + '/' +"messages"+ "/" + user);
      var otherUserRef = new Firebase("https://fiery-torch-9779.firebaseio.com/usernames/" + user + '/' +"messages"+ "/" + $scope.username);
      var otherSync = $firebase(otherUserRef)
      var synchy = $firebase(userRef);
      $scope.friendsMessages = otherSync.$asArray();
      $scope.privateMessages = synchy.$asArray(); 
    }
  	$scope.addFriend = function() {
    	$scope.added = !$scope.added;
  	}
    $scope.activate = function(){
      $scope.active = !$scope.active;
    }
    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };
    // $scope.message = 'Hello';

  });