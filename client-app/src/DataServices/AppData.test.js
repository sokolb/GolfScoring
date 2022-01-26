import Axios from "axios";
import AppData from "./AppData";

jest.mock("axios");

describe("AppData", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Players", () => {
        test.each([["testPlayersFile.json"], ["http://someurl/getAllPlayers"]])("getPlayers is called with correct parameter of %s", async (target) => {
            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.getPlayers(target);

            expect(Axios.get).toHaveBeenCalledWith(target);
        });

        it("deletePlayer calls API with correct value", async () => {
            var playerId = 55;
            var url = "http://localhost:8082/player/" + playerId;

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.deletePlayer(playerId);

            expect(Axios.delete).toHaveBeenCalledWith(url);
        });

        it("addPlayer calls API with correct values", async () => {
            var player = {
                GHIN: 1111,
                firstName: "Brian",
                lastName: "Sokoloski",
                handicap: 11.2,
            };
            var url = "http://localhost:8082/player/-1";
            var additionalData = {
                headers: {
                    "content-type": "application/json",
                },
                player,
            };

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.addPlayer(player);

            expect(Axios.post).toHaveBeenCalledWith(url, additionalData);
        });
    });

    it("getTeams is called with correct parameter", async () => {
        var fileName = "team_test.json";

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await AppData.getTeamsFromFile(fileName);

        expect(Axios.get).toHaveBeenCalledWith(fileName);
    });
});
