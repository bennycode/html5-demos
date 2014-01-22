var Zeta = Zeta || {};

/**
 * Instance of a team member.
 * 
 * @param {String} name
 * @param {String} originalTeam
 * @returns {Zeta.Member}
 */
Zeta.Member = function(name, originalTeam) {
  this.name = name || 'Sally Sample';
  this.originalTeam = originalTeam || 'Sample Team';
  this.newTeam = 'Sample Team II';
};