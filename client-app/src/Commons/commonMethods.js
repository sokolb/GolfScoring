export default class CommonMethods {
    static getTeamMemberNames(team, players) {
        return players
            .filter((player) => team.teamMemberIds.includes(player.id))
            .map((player) => player.firstName + " " + player.lastName)
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
