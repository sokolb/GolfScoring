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

        it("updatePlayer calls API with correct values", async () => {
            var player = {
                id: 4,
                GHIN: 1111,
                firstName: "Brian",
                lastName: "Sokoloski",
                handicap: 11.2,
            };
            var url = "http://localhost:8082/player/" + player.id;
            var additionalData = {
                headers: {
                    "content-type": "application/json",
                },
                player,
            };

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.updatePlayer(player);

            expect(Axios.post).toHaveBeenCalledWith(url, additionalData);
        });
    });

    describe("Teams", () => {
        test.each([["testTeamsFile.json"], ["http://someurl/getAllTeams"]])("getTeams is called with correct parameter of %s", async (target) => {
            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.getTeams(target);

            expect(Axios.get).toHaveBeenCalledWith(target);
        });

        it("deleteTeam calls API with correct value", async () => {
            var teamId = 66;
            var url = "http://localhost:8082/team/" + teamId;

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.deleteTeam(teamId);

            expect(Axios.delete).toHaveBeenCalledWith(url);
        });

        it("addTeam calls API with correct values", async () => {
            var team = {
                teamNumber: 1,
                teamMemberIds: [1, 4],
            };
            var url = "http://localhost:8082/team/-1";
            var additionalData = {
                headers: {
                    "content-type": "application/json",
                },
                team,
            };

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.addTeam(team);

            expect(Axios.post).toHaveBeenCalledWith(url, additionalData);
        });
    });

    describe("Courses", () => {
        test.each([["testCoursesFile.json"], ["http://someurl/getAllCourses"]])("getCourses is called with correct parameter of %s", async (target) => {
            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.getCourses(target);

            expect(Axios.get).toHaveBeenCalledWith(target);
        });
    });

    describe("Divisions", () => {
        test.each([["testDivisionsFile.json"], ["http://someurl/getAllDivisions"]])("getDivisions is called with correct parameter of %s", async (target) => {
            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.getDivisions(target);

            expect(Axios.get).toHaveBeenCalledWith(target);
        });

        it("deleteDivision calls API with correct value", async () => {
            var divisionId = 66;
            var url = "http://localhost:8082/division/" + divisionId;

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.deleteDivision(divisionId);

            expect(Axios.delete).toHaveBeenCalledWith(url);
        });

        it("addDivision calls API with correct values", async () => {
            var division = {
                name: "Men's Div 1",
            };
            var url = "http://localhost:8082/division/-1";
            var additionalData = {
                headers: {
                    "content-type": "application/json",
                },
                division,
            };

            Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
            await AppData.addDivision(division);

            expect(Axios.post).toHaveBeenCalledWith(url, additionalData);
        });
    });
});
