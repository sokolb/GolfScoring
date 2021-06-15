import Axios from "axios";
import GhinDataService from "../Ghin/GhinDataService";

jest.mock("axios");

describe("GhinDataService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("getUserToken fetches data successfully from the API", async () => {
        var user = "brian.sokoloski4@gmail.com";
        var pwd = "@bc!23456";
        var callData = {
            method: "POST",
            url: "https://api2.ghin.com/api/v1/golfer_login.json",
            headers: {
                "content-type": "application/json",
            },
            data: {
                token: "dummy token",
                user: {
                    password: pwd,
                    email_or_ghin: user,
                    remember_me: false,
                },
            },
        };

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await GhinDataService.getUserToken(user, pwd);

        expect(Axios).toHaveBeenCalledWith(callData);
    });
});
