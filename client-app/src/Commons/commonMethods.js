export default class CommonMethods {
    static getTeamMemberNames(team, players) {
        console.log("TEAM: " + JSON.stringify(team));
        console.log("PLAYERS: " + JSON.stringify(players));
        return players
            .filter((player) => team.teamMembers.some((member) => member.playerId === player.id))
            .map((player) => `${player.firstName} ${player.lastName}`)
            .join(" | ");
    }

    static getDivisionById(divisionId, divisions) {
        var division = divisions.find((d) => d.id === divisionId);
        if (division === undefined) {
            return { id: -1, name: "Temporary Team" };
        } else {
            return division;
        }
    }
}
