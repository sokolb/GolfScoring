export default class CommonMethods {
    static getTeamMemberNames(team, players) {
        var retval = players
            .filter((player) => team.teamMembers.some((member) => member.playerId === player.id))
            .map((player) => `${player.firstName} ${player.lastName}`)
            .join(" | ");
        if (team.forceAB) {
            retval += " (forced AB)";
        }
        return retval;
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
