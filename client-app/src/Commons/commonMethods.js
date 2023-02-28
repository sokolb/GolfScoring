export default class CommonMethods {
    static getTeamMemberNames(team, players) {
        return players
            .filter((player) => team.teamMemberIds.includes(player.id))
            .map((player) => player.firstName + " " + player.lastName)
            .join(" | ");
    }
}
