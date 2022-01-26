import Axios from "axios";

class AppData {
    getPlayersFromFile(fileName) {
        return Axios.get(fileName);
    }

    getTeamsFromFile(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
