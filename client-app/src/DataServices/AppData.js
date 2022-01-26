import Axios from "axios";

class AppData {
    getPlayers(target) {
        return Axios.get(target);
    }

    getTeamsFromFile(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
