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
                "Access-Control-Allow-Origin": "*",
            },
            player,
        });
    }

    getTeamsFromFile(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
