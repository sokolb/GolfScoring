import Axios from "axios";

class AppData {
    getPlayers(target) {
        return Axios.get(target);
    }

    deletePlayer(id) {
        return Axios.delete(`http://localhost:8082/player/${id}`);
    }

    getTeamsFromFile(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
