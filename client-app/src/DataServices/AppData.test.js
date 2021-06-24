import Axios from "axios";
import AppData from "./AppData";

jest.mock("axios");

describe("AppData", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("getPlayers is called with correct parameter", async () => {
        var fileName = "test.json";

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await AppData.getPlayers(fileName);

        expect(Axios.get).toHaveBeenCalledWith(fileName);
    });
});
