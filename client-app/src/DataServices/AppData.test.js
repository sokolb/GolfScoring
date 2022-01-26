import Axios from "axios";
import AppData from "./AppData";

jest.mock("axios");

describe("AppData", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Players", () => {
        test.each([["testPlayersFile.json"], ["http://someurl/getAllPlayers"]])(
            "getPlayers is called with correct parameter of %s",
            async (target) => {
                Axios.mockImplementationOnce(() =>
                    Promise.resolve({ data: "" })
                );
                await AppData.getPlayers(target);

                expect(Axios.get).toHaveBeenCalledWith(target);
            }
        );
    });

    it("getTeams is called with correct parameter", async () => {
        var fileName = "team_test.json";

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await AppData.getTeamsFromFile(fileName);

        expect(Axios.get).toHaveBeenCalledWith(fileName);
    });
});
