var friendInfo = require("../data/friends.js");

function apiRoutes(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendInfo);
  });

  app.post("/api/friends", function(req, res) {
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var friendScore = [];
    for (var i = 0; i < req.body.scores.length; i++) {
      friendScore.push(parseInt(req.body.scores[i]));
    }
    newFriend.scores = friendScore;

    var comparisonArray = [];
    for (var i = 0; i < friendInfo.length; i++) {
      var current = 0;
      for (var j = 0; j < newFriend.scores.length; j++) {
        current += Math.abs(newFriend.scores[j] - friendInfo[i].scores[j]);
      }
      comparisonArray.push(current);
    }

    var bestPossibleMatch = 0;
    for (var i = 1; i < comparisonArray.length; i++) {
      if (comparisonArray[i] <= comparisonArray[bestPossibleMatch]) {
        bestPossibleMatch = i;
      }
    }

    var newBestFriend = friendInfo[bestPossibleMatch];

    res.json(newBestFriend);

    friendInfo.push(newFriend);
  });
}

module.exports = apiRoutes;
