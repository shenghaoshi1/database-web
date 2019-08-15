
var app = angular.module('angularjsNodejsTutorial',['chart.js']);


app.controller('PlayerController', function($scope, $http) {
        $scope.message="";
        var request = $http.get('/showNationality/'+$scope.nationalities);
        request.success(function(nationalities) {
            $scope.nationalities = nationalities;
        });
        request.error(function(nationalities){
            console.log('err');
        });
    
        $scope.Submit = function() {

            var nation="nationUndefined";
            var premier = "premierUndefined";
            var position = "positionUndefined";

            if($scope.selectedNationality !== undefined && $scope.selectedNationality !== null) {
              nation = $scope.selectedNationality.Nationality;
            }

            if($scope.selectedPremier !== undefined && $scope.selectedPremier !== "") {
              premier = $scope.selectedPremier;
            }

            if($scope.selectedPosition !== undefined && $scope.selectedPosition !== "") {
              position = $scope.selectedPosition;
            }


            var request = $http.get('/playerSearch/data/' + nation + '/' + premier + '/' + position);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        }; 

        $scope.Search = function() {

            var request = $http.get('/playerSearch/' + $scope.player);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        }; 
});

app.controller('PlayerProfileController', function($scope, $http, $location) {
    $scope.message="";
    $scope.labels = ["Crossing", "Balance", "Aggression", "Composure", "Ballcontrol", "Agility"];
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var playerID = $location.absUrl().substring(start,end);
      
    var request = $http.get('/playerProfile/data/' + playerID); 
    request.success(function(data) {
        $scope.data = data;
        $scope.data_radar = [
        [data[0].Crossing, data[0].Balance, data[0].Aggression, data[0].Composure, data[0].Ballcontrol, data[0].Agility],
        [100,0,100,100,100,100]
      ];
    });
    request.error(function(data){
        console.log('err');
    }); 

    var request = $http.get('/playerProfile/photo/' + playerID); 
    request.success(function(data2) {
        $scope.data2 = data2;
    });
    request.error(function(data2){
        console.log('err');
    }); 

    var request = $http.get('/playerProfile/schedule/' + playerID); 
    request.success(function(data3) {
        $scope.data3 = data3;
    });
    request.error(function(data3){
        console.log('err');
    }); 

});






app.controller('comingeventsController', function($scope, $http, $location) {
    $scope.message="";
    var request = $http.get('/date/'+$scope.comingeventdates);
        request.success(function(comingeventdates) {
            $scope.comingeventdates = comingeventdates;
        });
        request.error(function(comingeventdates){
            console.log('err');
        });
     var request = $http.get('/comingevent1/'+$scope.comingeventclubs);
        request.success(function(comingeventclubs) {
            $scope.comingeventclubs = comingeventclubs;
        });
        request.error(function(comingeventclubs){
            console.log('err');
        });
    var request = $http.get('/comingevent2/'+$scope.comingeventpremiers);
        request.success(function(comingeventpremiers) {
            $scope.comingeventpremiers = comingeventpremiers;
        });
        request.error(function(comingeventpremiers){
            console.log('err');
        });
    
    
    $scope.comingeventclub = function() {

            var club="clubUndefined";
            var date='dateUndefined';
           
            if($scope.selectedcomingeventclub !== undefined && $scope.selectedcomingeventclub !== null) {
              club = $scope.selectedcomingeventclub.club;
            }
            if($scope.selectedcomingeventdate !== undefined && $scope.selectedcomingeventdate !== null) {
              date = $scope.selectedcomingeventdate.Date;
            }

           

            var request = $http.get('/comingevent3/'+date+'/' + club );
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        }; 

        $scope.comingeventpremier = function() {
        var premier="premierUndefined";
        var date='dateUndefined';
            if($scope.selectedcomingeventpremier !== undefined && $scope.selectedcomingeventpremier !== null) {
              premier= $scope.selectedcomingeventpremier.Premier;
            }
   if($scope.selectedcomingeventdate !== undefined && $scope.selectedcomingeventdate !== null) {
              date = $scope.selectedcomingeventdate.Date;
            }
           

            var request = $http.get('/comingevent4/' +date+'/'+ premier );
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });
};

});





app.controller('historymatchController', function($scope, $http, $location) {
    $scope.message="";
    var request = $http.get('/history/'+$scope.historymatchdates);
        request.success(function(historymatchdates) {
            $scope.historymatchdates = historymatchdates;
        });
        request.error(function(historymatchdates){
            console.log('err');
        });
     var request = $http.get('/historyevent1/'+$scope.historyeventclubs);
        request.success(function(historyeventclubs) {
            $scope.historyeventclubs = historyeventclubs;
        });
        request.error(function(historyeventclubs){
            console.log('err');
        });
    var request = $http.get('/historyevent2/'+$scope.historyeventpremiers);
        request.success(function(historyeventpremiers) {
            $scope.historyeventpremiers = historyeventpremiers;
        });
        request.error(function(historyeventpremiers){
            console.log('err');
        });
    
    
    $scope.historyeventclub = function() {

            var club="clubUndefined";
            var date='dateUndefined';
           
            if($scope.selectedhistoryeventclub !== undefined && $scope.selectedhistoryeventclub !== null) {
              club = $scope.selectedhistoryeventclub.club;
            }
            if($scope.selectedhistoryeventdate !== undefined && $scope.selectedhistoryeventdate !== null) {
              date = $scope.selectedhistoryeventdate.Season;
            }

           

            var request = $http.get('/historyevent3/'+date+'/' + club );
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        
        }; 
        

        $scope.historyeventpremier = function() {
        var premier="premierUndefined";
        var date='dateUndefined';
            if($scope.selectedhistoryeventpremier !== undefined && $scope.selectedhistoryeventpremier !== null) {
              premier= $scope.selectedhistoryeventpremier.Premier;
            }
   if($scope.selectedhistoryeventdate !== undefined && $scope.selectedhistoryeventdate !== null) {
              date = $scope.selectedhistoryeventdate.Season;
            }
           

            var request = $http.get('/historyevent4/' +date+'/'+ premier );
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });
};
$scope.historyrecent = function() {
            var club="clubUndefined";
           
            if($scope.selectedhistoryeventclub !== undefined && $scope.selectedhistoryeventclub !== null) {
              club = $scope.selectedhistoryeventclub.club;
            }
        var request = $http.get('/historyrecent/' + club);
        request.success(function(data){
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
}
});


app.controller('TeamProfileController', function($scope, $http, $location) {
    $scope.message="";
    $scope.labels = ["Crossing", "Balance", "Aggression", "Composure", "Ballcontrol", "Agility", 'q', 'q'];
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
    var request = $http.get('/teamProfile/data_chart/' + teamName); 
    request.success(function(data_chart) {
        $scope.data = data;
        $scope.data_chart = [
        [data_chart[0].goal, data_chart[1].goal, data_chart[2].goal, data_chart[3].goal, data_chart[4].goal, data_chart[5].goal, data_chart[6].goal, data_chart[7].goal],
        [data_chart[0].goalA, data_chart[1].goalA, data_chart[2].goalA, data_chart[3].goalA, data_chart[4].goalA, data_chart[5].goalA, data_chart[6].goalA, data_chart[7].goalA],
      ];
        $scope.series = [data_chart[1].name, 'Series B'];
    });
    var request = $http.get('/teamProfile/data/' + teamName); 
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    }); 
});
app.controller('TeamChartController', function($scope, $http, $location) {
    $scope.message="";

    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);

    var request = $http.get('/teamProfile/data_chart/' + teamName); 
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
    };

    request.success(function(data_chart) {
        $scope.data = [
        [data_chart[0].goal, data_chart[1].goal, data_chart[2].goal, data_chart[3].goal, data_chart[4].goal, data_chart[5].goal, data_chart[6].goal, data_chart[7].goal],
        [data_chart[0].goalA, data_chart[1].goalA, data_chart[2].goalA, data_chart[3].goalA, data_chart[4].goalA, data_chart[5].goalA, data_chart[6].goalA, data_chart[7].goalA],
      ];
        $scope.labels = [data_chart[0].Date.substring(0, 10), data_chart[1].Date.substring(0, 10), data_chart[2].Date.substring(0, 10), data_chart[3].Date.substring(0, 10), data_chart[4].Date.substring(0, 10), data_chart[5].Date.substring(0, 10), data_chart[6].Date.substring(0, 10), data_chart[7].Date.substring(0, 10)];

        /*$scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
        ];*/
        $scope.series = [data_chart[1].name, 'Opponent'];
    });
});

app.controller('TeamInfoController', function($scope, $http, $location) {
    $scope.message="";
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
      
    var request = $http.get('/teamProfile/info/' + teamName); 
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    }); 

    var request = $http.get('/teamProfile/rank/' + teamName); 
    request.success(function(data2) {
        $scope.data2 = data2;
    });
    request.error(function(data2){
        console.log('err');
    }); 

    var request = $http.get('/teamProfile/rank2/' + teamName); 
    request.success(function(data3) {
        $scope.data3 = data3;
    });
    request.error(function(data3){
        console.log('err');
    }); 

    var request = $http.get("/teamProfile/photo/"+teamName);
    request.success(function(data4){
      $scope.data4 = data4;
    });
    request.error(function(err){
      console.log(err);
    })
});

app.controller('TeamRankController', function($scope, $http, $location) {
    $scope.message="";
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
      
    var request = $http.get('/teamProfile/rank/' + teamName); 
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    }); 
});

app.controller('TeamFutureController', function($scope, $http, $location) {
    $scope.message="";
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
      
    var request = $http.get('/teamFutureMatches/data/' + teamName); 
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    }); 
});

app.controller('TeamRecentController', function($scope, $http, $location) {
    $scope.message="";
    $scope.options =  {
      scale: {
        pointLabels: {
          fontSize: 20
        }
      }
    }
    $scope.colors = ['#0277bd', '#f5f5f5'];
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
      
    var request = $http.get('/teamRecentMatches/data/' + teamName); 
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    }); 
});

app.controller('TeamController', function($scope, $http) {
        $scope.message="";
        var request = $http.get('/showNationality/'+$scope.nationalities);
        request.success(function(nationalities) {
            $scope.nationalities = nationalities;
        });
        request.error(function(nationalities){
            console.log('err');
        });
    
        $scope.tSubmit = function() {

            var premier = "premierUndefined";
            var position = "positionUndefined";

            if($scope.selectedPremier !== undefined && $scope.selectedPremier !== "") {
              premier = $scope.selectedPremier;
            }

            var request = $http.get('/teamSearch/data/' + premier);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        }; 

        $scope.tSearch = function() {

            var request = $http.get('/teamSearch/' + $scope.team);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });    
        }; 
});


app.controller('teamPhotoController', function($scope,$http, $location) {
    var url = $location.absUrl();
    var start = url.lastIndexOf("/")+1;
    var end = url.length;
    var teamName = $location.absUrl().substring(start,end);
    var request = $http.get("/teamProfile/photo/"+teamName);
    request.success(function(data){
      $scope.data = data;
    });
    request.error(function(err){
      console.log(err);
    })
});

/*
var app = angular.module('angularjsNodejsTutorial',[]);

app.controller('myController', function($scope, $http) {
        $scope.message="";
        var request = $http.get('/showclub/'+$scope.clubs);
        request.success(function(clubs) {
            $scope.clubs = clubs;
        });
        request.error(function(clubs){
            console.log('err');
        });
    
        $scope.Submit = function() {
        if ($scope.selectedclub){
        var request = $http.get('/data/'+$scope.player+'/'+$scope.selectedclub.Club);}
        else{
        var request = $http.get('/data/'+$scope.player+'/'+$scope.selectedclub);}
        
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

/*
// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js
app.controller('insertController', function($scope, $http){
		$scope.message="";
		
		$scope.Insert=function(){
		var request=$http.get("/insert/"+$scope.login+"/"+$scope.name+"/"+$scope.sex+"/"+$scope.RelationshipStatus+"/"+$scope.Birthyear);
		request.success(function(data){
		$scope.data=data;
		});
		requet.error(function(data){
		console.log('err');
		});
	};
});
app.controller('friendsController', function($scope, $http) {
        $scope.message="";
        $scope.Friends= function() {
        var request = $http.get('/friends/'+$scope.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('familyController', function($scope, $http){

        $scope.message="";
         var request = $http.get('/showfamily/'+$scope.logins);
        request.success(function(logins) {
            $scope.logins = logins;
        });
        request.error(function(logins){
            console.log('err');
        });
        
        $scope.Family= function() {
        var request = $http.get('/showfamily2/'+$scope.selectedlogin.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
        };
        
});
	*/	
   