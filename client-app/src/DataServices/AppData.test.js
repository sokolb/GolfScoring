import Axios from "axios";
import AppData from "./AppData";

jest.mock("axios");

describe("AppData", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("getPlayersFromFile is called with correct parameter", async () => {
        var fileName = "test.json";

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await AppData.getPlayersFromFile(fileName);

        expect(Axios.get).toHaveBeenCalledWith(fileName);
    });

    it("getTeams is called with correct parameter", async () => {
        var fileName = "team_test.json";

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await AppData.getTeamsFromFile(fileName);

        expect(Axios.get).toHaveBeenCalledWith(fileName);
    });
});
