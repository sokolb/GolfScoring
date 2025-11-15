import Axios from "axios";
import config from "../config";

class AppData {
    getPlayers(target) {
        return Axios.get(target);
    }

    deletePlayer(id) {
        return Axios.delete(`${config.apiBaseUrl}/player/${id}`);
    }

    addPlayer(player) {
        return Axios.post(`${config.apiBaseUrl}/player/-1`, {
            headers: {
                "content-type": "application/json",
            },
            player,
        });
    }

    updatePlayer(player) {
        return Axios.post(`${config.apiBaseUrl}/player/${player.id}`, {
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
        return Axios.delete(`${config.apiBaseUrl}/team/${id}`);
    }

    addTeam(team) {
        return Axios.post(`${config.apiBaseUrl}/team/-1`, {
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
        return Axios.delete(`${config.apiBaseUrl}/division/${id}`);
    }

    addDivision(division) {
        return Axios.post(`${config.apiBaseUrl}/division/-1`, {
            headers: {
                "content-type": "application/json",
            },
            division,
        });
    }
}
export default new AppData();
