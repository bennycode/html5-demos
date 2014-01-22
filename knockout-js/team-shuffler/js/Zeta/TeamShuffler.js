var Zeta = Zeta || {};

Zeta.TeamShuffler = function() {

  var listData;

  /**
   * Creates a new instance of a team member from a given row.
   * 
   * @param {String} row Table row, e.g. "\nalienbot:Frontend" 
   * @returns {Zeta.Member}
   */
  function parseMemberFromRow(row) {
    var columns = row.split(':');
    var name = columns[0].replace('\n', '');
    var originalTeam = columns[1];

    return new Zeta.Member(name, originalTeam);
  }

  /**
   * Reads data (format: "member:team") line by line from a given string.
   * 
   * @returns {Zeta.TeamData}
   */
  function parseTeamDataFromList() {
    var data = new Zeta.TeamData(0, {});

    // Parse members from list
    var rows = listData.split('\r');
    for (var i in rows) {
      var row = rows[i];
      var member = parseMemberFromRow(row);

      // Put members into original teams
      var team = member.originalTeam;
      if (!data.teams.hasOwnProperty(team)) data.teams[team] = [];
      data.teams[team].push(member);
      data.totalMembers++;
    }

    return data;
  }

  /**
   * Assigns each team member to a new team and returns them as an array.
   * 
   * @param {Zeta.TeamData} data Data with team info.
   * @returns {Array<Zeta.Member>}
   */
  function addMembersToNewTeams(data) {
    var members = [];
    var numberOfTeams = Object.keys(data.teams).length;
    var newTeamIndex = 0;

    for (var key in data.teams) {
      var team = data.teams[key];

      for (var i in team) {
        var member = team[i];
        member.newTeam = 'Team ' + (newTeamIndex + 1).toString();
        members.push(member);

        newTeamIndex++;
        if (newTeamIndex === numberOfTeams) {
          newTeamIndex = 0;
        }
      }
    }

    return members;
  }

  return {
    shuffle: function() {
      var data = parseTeamDataFromList();
      return addMembersToNewTeams(data);
    },
    // Setter & Getter
    getListData: function() {
      return listData;
    },
    setListData: function(data) {
      listData = data;
    },
    getViewModel: function() {
      return viewModel;
    },
    setViewModel: function(model) {
      viewModel = model;
    }
  };

}();