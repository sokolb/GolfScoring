import Axios from "axios";

class AppData {
    getPlayers(target) {
        return Axios.get(target);
    }

    deletePlayer(id) {
        return Axios.delete(`http://localhost:8082/player/${id}`);
    }

    addPlayer(player) {
        return Axios.post("http://localhost:8082/player/-1", {
            headers: {
                "content-type": "application/json",
            },
            player,
        });
    }

    updatePlayer(player) {
        return Axios.post("http://localhost:8082/player/" + player.id, {
            headers: {
                "content-type": "application/json",
            },
            player,
        });
    }

    getTeams(fileName) {
        return Axios.get(fileName);
    }

    deleteTeam(id) {
        return Axios.delete(`http://localhost:8082/team/${id}`);
    }

    addTeam(team) {
        return Axios.post("http://localhost:8082/team/-1", {
            headers: {
                "content-type": "application/json",
            },
            team,
        });
    }

    getCourses(fileName) {
        return Axios.get(fileName);
    }

    getDivisions(target) {
        return Axios.get(target);
    }

    deleteDivision(id) {
        return Axios.delete(`http://localhost:8082/division/${id}`);
    }

    addDivision(division) {
        return Axios.post("http://localhost:8082/division/-1", {
            headers: {
                "content-type": "application/json",
            },
            division,
        });
    }
}
export default new AppData();
