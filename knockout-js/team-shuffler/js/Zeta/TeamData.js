var Zeta = Zeta || {};

/**
 * Holds the data that can be read from a team list.
 * 
 * @param {Number} totalMembers Number of members of all teams.
 * @param {Object} teams Object with an array of teams.
 * @returns {Zeta.TeamData}
 */
Zeta.TeamData = function(totalMembers, teams) {
  this.totalMembers = totalMembers || 0;
  this.teams = teams || {
    SampleTeam: [
      new Zeta.Member('Sam Sample'),
      new Zeta.Member('Sally Sample')
    ]
  };
};