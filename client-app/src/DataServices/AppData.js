import Axios from "axios";

class AppData {
    getPlayers(fileName) {
        if (fileName !== undefined && fileName !== null) {
            return Axios.get(fileName);
        } else {
            return Axios({
                method: "GET",
                url: `http://localhost:8082/getAllPlayers`,
                headers: {
                    "content-type": "application/json",
                },
            });
        }
    }

    getTeamsFromFile(fileName) {
        return Axios.get(fileName);
    }
}
export default new AppData();
