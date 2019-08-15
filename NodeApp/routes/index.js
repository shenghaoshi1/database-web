var express = require('express');
var router = express.Router();
var path = require('path');
var Premier = require('../models/premier');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '****',
  user     : '****',
  password : '****',
  database : '****',
  port     :'****'
});

// Connect to MLab
/*
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://CIS550:00000000a@ds159100.mlab.com:59100/soccer', (err) => {
  if (err) {
    console.log('Could not connect to Mlab: ', err);
  } else {
    console.log('Connected to Mlab!');
  }
});

var db = mongoose.connection;
*/


/*
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
  console.log(err)
    if(!err) { 
     console.log('we are connected'); 
  }

    var db = client.db('soccer');
    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {
        "category_code": "biotech"
    };

    db.collection('Premier').find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        assert.notEqual(dozcs.length, 0);

        docs.forEach(function (doc) {
            console.log(doc);
        });

        client.close();
    });
});
*/


/* GET home page. */

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


router.get('/players', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'Player.html'));
});


router.get('/tweets', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'tweets.html'));
});

/*
----------------------------------------------------------------player-----------------------------------------------------
*/

/*
router.get('/showclub/:clubs', function(req,res) {
  var query = 'SELECT distinct Club from player order by Club';
  connection.query(query,[req.params.clubs],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});


router.get('/data/:player/:club', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 if (req.params.player== 'undefined' || req.params.player=='' || !req.params.player){
  if (req.params.club== 'undefined' || req.params.club=='' || !req.params.club){
  	var query='SELECT * from player left join capacity on player.ID=capacity.ID';
  	connection.query(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
  }
  else {
  var query='SELECT * from player left join capacity on player.ID=capacity.ID where Club=?';
  connection.query(query,[req.params.club],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
  }
  }
  else{
  if (req.params.club== 'undefined' || req.params.club=='' || !req.params.club){
  var query = 'SELECT * from player left join capacity on player.ID=capacity.ID where Name= ?';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,[req.params.player],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
  }
  else{
  var query = 'SELECT * from player left join capacity on player.ID=capacity.ID where Name= ? and Club=?'
  connection.query(query,[req.params.player,req.params.club],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  }
  
  
  }
 
});
*/


router.get('/showNationality/:nationalities', function(req,res) {
  var query = 'SELECT distinct Nationality from player order by Nationality';
  connection.query(query,[req.params.nationalities],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/playerSearch/:player', function(req, res) {
  var query = "SELECT * from player where Name LIKE '%" + req.params.player + "%'";
  connection.query(query,[req.params.player],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/playerSearch/data/:nation/:premier/:position', function(req, res) {
  var nation = (req.params.nation);
  var query_nation;

  if(nation !== "nationUndefined") {
    query_nation = "p.Nationality = '" + nation +"'";
  } else {
    query_nation = "p.Nationality is not null";
  }

  var premier = (req.params.premier);
  var query_premier;

    if(premier !== "premierUndefined") {
    switch(premier) {
      case '0':
        query_premier = " AND c.Premier = 'Italian Serie A'";
        break;
      case '1':
        query_premier = " AND c.Premier = 'English Premier League'";
        break;
      case '2':
        query_premier = " AND c.Premier = 'Spanish Primera División'";
        break;
      case '3':
        query_premier = " AND c.Premier = 'French Ligue 1'";
        break;
      case '4':
        query_premier = " AND c.Premier = 'German Bundesliga'";
        break;
      case '5':
        query_premier = "";
        break;
      default:
        query_premier = "";
        break;
      }
    } else {
      query_premier = "";
    }

  var position = (req.params.position);
  var query_position;

    if(position !== "positionUndefined") {
    switch(position) {
      case '0':
        query_position = " AND p.PreferedPositions like '%GK%'";
        break;
      case '1':
        query_position = " AND p.PreferedPositions like '%LWB%'";
        break;
      case '2':
        query_position = " AND p.PreferedPositions like '%RWB%'";
        break;
      case '3':
        query_position = " AND p.PreferedPositions like '%LB%'";
        break;
      case '4':
         query_position = " AND p.PreferedPositions like '%CB%'";
        break;
      case '5':
         query_position = " AND p.PreferedPositions like '%RB%'";
        break;
      case '6':
        query_position = " AND p.PreferedPositions like '%LM%'";
        break;
      case '7':
        query_position = " AND p.PreferedPositions like '%CM%'";
        break;
      case '8':
        query_position = " AND p.PreferedPositions like '%CDM%'";
        break;
      case '9':
        query_position = " AND p.PreferedPositions like '%CAM%'";
        break;
      case '10':
        query_position = " AND p.PreferedPositions like '%RM%'";
        break;
      case '11':
        query_position = " AND p.PreferedPositions like '%LW%'";
        break;
      case '12':
        query_position = " AND p.PreferedPositions like '%RW%'";
        break;
      case '13':
        query_position = " AND p.PreferedPositions like '%CF%'";
        break;
      case '14':
        query_position = " AND p.PreferedPositions like '%ST%'";
        break;
      default:
        query_position = "";
        break;
      }
    } else {
      query_position = "";
    }


  var query = "select p.* from player p left join capacity cap on p.ID=cap.ID left join club c on p.Club = c.Name where "+query_nation+query_premier+query_position;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

/*
----------------------------------------------------------------playerProfile-----------------------------------------------------
*/



router.get('/playerProfile/:playerID', function(req, res, next) {   
  res.sendFile(path.join(__dirname, '../', 'views', 'playerProfile.html'));
});

router.get('/playerProfile/data/:playerID', function(req, res, next) {   
  var query = "select p.*, cap.*, c.Premier, c.Logo from player p left join capacity cap on p.ID=cap.ID left join club c on p.Club = c.Name where p.ID = ?"
  connection.query(query,[req.params.playerID],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});


router.get('/playerProfile/photo/:playerID', function(req, res, next) {   
  var query = "select Photo from photo where photo.ID = ?"
  connection.query(query,[req.params.playerID],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/playerProfile/schedule/:playerID', function(req, res, next) {   
  var query = "select * from (Select f.Date, f.Home, f.Away from FutureMatch f JOIN club c ON f.Away=c.Name JOIN player p ON c.Name=p.club WHERE p.ID=? UNION Select f.Date, f.Home, f.Away from FutureMatch f JOIN club c ON f.Home=c.Name JOIN player p ON c.Name=p.club WHERE p.ID=? limit 5) t where Date >= DATE(NOW()) order by Date;"
  connection.query(query,[req.params.playerID,req.params.playerID],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});





/*
router.get('/playerProfile/id/:teamID', function(req, res, next) {
  console.log(req.params);
  var teamID = req.params.teamID;
  var query = "select p.name, p.age, p.overall, p.photo, p.flag, p.clublogo, p.nationality, p.club, p.wage, p2.preferposition, p3.Stamina, p3.Standing_tackle, p3.Short_passing, p3.Sprint_speed, p3.Acceleration, p3.Aggression, p3.Agility, p3.Balance, p3.Crossing, p3.Curve, p3.Dribbling, p3.Finishing, p3.Free_kick_accuracy, p3.Heading_accuracy, p3.Interceptions, p3.Jumping from mydb.PlayerPersonalData p, mydb.PlayerPlayingPositionData p2, mydb.PlayerAttribute p3 where p.ID = "+ teamID + " and p2.ID = "+ teamID + " and p3.ID = "+ teamID;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {res.json(rows);}
    });

});
*/


/*
----------------------------------------------------------------Schedule-----------------------------------------------------
*/


router.get('/comingevents', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'comingevents.html'));

});
router.get('/date/:comingeventdates', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = "SELECT distinct date_format(Date,'%Y-%m-%d') as Date from FutureMatch where Home is not null and Away is not null and Date >= DATE(NOW()) order by Date";
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,[req.params.comingeventdates],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});
router.get('/comingevent1/:comingeventclubs', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = '(SELECT distinct home as club from FutureMatch) union (SELECT distinct away as club from FutureMatch)';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});
router.get('/comingevent2/:comingeventpremiers', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = 'select distinct Premier from FutureMatch';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});
router.get('/comingevent3/:date/:club', function(req, res) {
  var date = (req.params.date);
  var club=(req.params.club);

  if(date!== "dateUndefined") {
    var query_date = "date_format(Date,'%Y-%m-%d')= '" + date+"'";
  } else {
    var query_date = "Date is not null";
  }
  if(club!== "clubUndefined") {
    var query_club = "(Home= '" + club+"' or Away='"+club+"')";
  } else {
    var query_club = "Home is not null and Away is not null";
  }


  var query = "select * from FutureMatch where " +query_date+' and '+query_club;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

router.get('/comingevent4/:date/:premier', function(req, res) {
  var date = (req.params.date);
  var premier=(req.params.premier);

  if(date!== "dateUndefined") {
    var query_date = "date_format(Date,'%Y-%m-%d')= '" + date+"'";
  } else {
    var query_date = "Date is not null";
  }
  if(premier!== "premierUndefined") {
    var query_premier = "Premier= '" + premier+"'";
  } else {
    var query_premier = "Premier is not null";
  }

 


  var query = "select * from FutureMatch where " +query_date+' and '+query_premier;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});



/*
----------------------------------------------------------------Score-----------------------------------------------------
*/

router.get('/historymatch', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'histroymatch.html'));

});


router.get('/history/:historymatchdates', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = 'SELECT distinct Season from MatchHistory';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,[req.params.historymatchdates],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});
router.get('/historyevent1/:historyeventclubs', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = '(SELECT distinct Home as club from MatchHistory) union (SELECT distinct Away as club from MatchHistory)';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});
router.get('/historyevent2/:historyeventpremiers', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  
 
  var query = 'select distinct Premier from MatchHistory';
  // note that email parameter in the request can be accessed using "req.params.email"
  //console.log(query);
  connection.query(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
  
});

router.get('/historyrecent/:club', function(req,res){
    var club = (req.params.club);
    var query = "select * from MatchHistory where Home = '" + club +"' or Away ='" + club +" ' order by Date desc LIMIT 10";
    connection.query(query,function(err, rows, fields){
        if(err) console.log(err);
        else{
            res.json(rows);
        }
    });
});



router.get('/historyevent3/:date/:club', function(req, res) {
  var date = (req.params.date);
  var club=(req.params.club);

  if(date!== "dateUndefined") {
    var query_date = "Season= '" + date+"'";
  } else {
    var query_date = "Season is not null";
  }
  if(club!== "clubUndefined") {
    var query_club = "Home= '" + club+"' or Away='"+club+"'";
  } else {
    var query_club = "Home is not null and Away is not null";
  }


  var query = "select * from MatchHistory where " +query_date+' and ('+query_club+')';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

router.get('/historyevent4/:date/:premier', function(req, res) {
  var date = (req.params.date);
  var premier=(req.params.premier);

  if(date!== "dateUndefined") {
    var query_date = "Season= '" + date+"'";
  } else {
    var query_date = "Season is not null";
  }
  if(premier!== "premierUndefined") {
    var query_premier = "Premier= '" + premier+"'";
  } else {
    var query_premier = "Premier is not null";
  }

 


  var query = "select * from MatchHistory where " +query_date+' and '+query_premier;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});


/*
----------------------------------------------------------------Team-----------------------------------------------------
*/
router.get('/teams', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'Team.html'));
});



router.get('/teamSearch/:team', function(req, res) {
  var query = "SELECT * from club where Name LIKE '%" + req.params.team + "%'";
  connection.query(query,[req.params.team],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/teamSearch/data/:premier', function(req, res) {
  var nation = (req.params.nation);
  var query_nation;

  if(nation !== "nationUndefined") {
    query_nation = "p.Nationality = '" + nation +"'";
  } else {
    query_nation = "p.Nationality is not null";
  }

  var premier = (req.params.premier);
  var query_premier;

    if(premier !== "premierUndefined") {
    switch(premier) {
      case '0':
        query_premier = "Premier = 'Italian Serie A'";
        break;
      case '1':
        query_premier = "Premier = 'English Premier League'";
        break;
      case '2':
        query_premier = "Premier = 'Spanish Primera División'";
        break;
      case '3':
        query_premier = "Premier = 'French Ligue 1'";
        break;
      case '4':
        query_premier = "Premier = 'German Bundesliga'";
        break;
      case '5':
        query_premier = "";
        break;
      default:
        query_premier = "";
        break;
      }
    } else {
      query_premier = "";
    }

  var query = "select * from club where "+query_premier;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});



router.get('/teamProfile/:teamName', function(req, res, next) {   
  res.sendFile(path.join(__dirname, '../', 'views', 'teamProfile.html'));
});



router.get('/teamProfile/data/:teamName', function(req, res, next) {   
  var query = "select P.ID, P.Name, P.PreferedPositions, P.Age, CA.Score, PH.Photo from player P JOIN capacity CA ON P.ID = CA.ID LEFT JOIN photo PH ON P.ID = PH.ID where P.Club = ?"
  console.log(query);
  connection.query(query,[req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/teamProfile/data_chart/:teamName', function(req, res, next) {   
  var query = "SELECT * FROM ((SELECT Date, FTHG AS goal, Home AS name FROM MatchHistory WHERE Home = ?) UNION (SELECT Date, FTAG AS goal, Away AS name FROM MatchHistory WHERE Away = ?)) T1 NATURAL JOIN ((SELECT Date, FTAG AS goalA, Away AS against FROM MatchHistory WHERE Home = ?) UNION (SELECT Date, FTHG AS goalA, Home AS against FROM MatchHistory WHERE Away = ?)) T2 ORDER BY Date Desc LIMIT 8;"
  console.log(query);
  connection.query(query,[req.params.teamName, req.params.teamName, req.params.teamName, req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/teamProfile/info/:teamName', function(req, res, next) {   
  var query = "select C.Name AS Name, C.Premier, sum(P.Wage) AS Total from club C JOIN player P ON C.Name = P.Club where C.Name = ? GROUP BY C.Name"
  console.log(query);
  connection.query(query,[req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});
  
router.get('/teamProfile/rank/:teamName', function(req, res, next) {   
  var query = "SELECT * FROM (Select Name, total_value, @curRank := @curRank + 1 as rank from ( select c.Name, sum(p.Wage) as total_value from club c join player p on c.Name = p.Club JOIN club c2 ON c2.Premier = c.Premier WHERE c2.Name = ? group by c.Name) t, (select @curRank:=0) r Order by total_value Desc) T WHERE T.Name = ?";
  console.log(query);
  connection.query(query,[req.params.teamName, req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/teamProfile/rank2/:teamName', function(req, res, next) {   
  var query = "SELECT * FROM (Select Name, total_value, @curRank := @curRank + 1 as rank from ( select c.Name, sum(p.Value) as total_value from club c join player p on c.Name = p.Club JOIN club c2 ON c2.Premier = c.Premier WHERE c2.Name = ? group by c.Name) t, (select @curRank:=0) r Order by total_value Desc) T WHERE T.Name = ?";
  console.log(query);
  connection.query(query,[req.params.teamName, req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/teamFutureMatches/:teamName', function(req, res, next) {   
  res.sendFile(path.join(__dirname, '../', 'views', 'teamProfileFutureMatch.html'));
});

router.get('/teamFutureMatches/data/:teamName', function(req, res, next) {   
  var query = "SELECT * FROM FutureMatch where Home = ? OR Away = ?"
  console.log(query);
  connection.query(query,[req.params.teamName, req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/teamRecentMatches/:teamName', function(req, res, next) {   
  res.sendFile(path.join(__dirname, '../', 'views', 'teamRecentMatch.html'));
});

router.get('/teamRecentMatches/data/:teamName', function(req, res, next) {   
  var query = "select * from MatchHistory where (Home = ? or Away = ?) order by Date desc LIMIT 10;"
  console.log(query);
  connection.query(query,[req.params.teamName, req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});



router.get('/teamProfile/photos/:teamName', function(req, res, next) { 
  var query = "select Logo from logo where Name = ?"
  console.log(query);
  connection.query(query,[req.params.teamName],function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});



router.get('/teamProfile/photo/:teamName', function(req, res, next) { 

  var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

  MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
    console.log(err)
      if(!err) { 
       console.log('we are connected'); 
    }

      var db = client.db('soccer');

      var query = {"teams.name" : req.params.teamName};
      console.log(query);

      //db.collection('Premier').find({"teams.name" : req.params.teamName}).toArray(function (err, rows) {
      //db.collection('Premier').find(query, function(err, rows) {
      db.collection('Premier').aggregate([{$unwind:"$teams"},{$match:{"teams.name":req.params.teamName}},{$project:{"teams.logo": 1}}]).toArray(function (err, rows) {
        if(err) {
          console.log("error!!")
          console.log(err);
        }
        else{
          console.log("returned results")
          console.log(rows)
          res.json(rows);
        }
        client.close();
      });
  });



/*
  console.log("mongodb!!")  
  var query = {"teams.name" : req.params.teamName};
  //var query = {};
  console.log(query);


    db.collection('Premier').find(query, function(err, items) {
      if(err) {
          console.log('findOne error:', err);
      }
      else {
        console.log(items.toArray());
        res.json(items);
      }
  });
  

  
  Premier.find(query,function(err, rows, fields) {
    if (err) console.log(err);
    else {
        console.log(rows)
        res.send("success")
        //res.json(rows); 
        //res.render('test', {results_from_mongo : rows });
      }
  });
  */

});
	

module.exports = router;