import Axios from "axios";

class AppData {
    getPlayers(fileName) {
        return Axios.get(fileName);
    }

    getTeams(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
