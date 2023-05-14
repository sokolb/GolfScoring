import Axios from "axios";
import GhinDataService from "./GhinDataService";

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

    it("getUserCourseHandicap fetches data successfully from the API", async () => {
        var GHIN = "1112321";
        var user_token = "axafsdfasdf";

        var formattedDate = formatDate(new Date());

        var callData = {
            method: "GET",
            url: `https://api2.ghin.com/api/v1/course_handicaps.json?golfer_id=${GHIN}&course_id=749&source=GHINcom&played_at=${formattedDate}`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            data: {
                golfer_id: GHIN,
            },
        };

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await GhinDataService.getUserCourseHandicap(GHIN, user_token);

        expect(Axios).toHaveBeenCalledWith(callData);
    });

    it("getUserHandicap fetches data successfully from the API", async () => {
        var GHIN = "1112321";
        var user_token = "axafsdfasdf";

        var callData = {
            method: "GET",
            url: `https://api2.ghin.com/api/v1/golfers.json?status=Active&from_ghin=true&per_page=25&page=1&golfer_id=${GHIN}&includeLowHandicapIndex=true&source=GHINcom`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            data: {
                golfer_id: GHIN,
            },
        };

        Axios.mockImplementationOnce(() => Promise.resolve({ data: "" }));
        await GhinDataService.getUserHandicap(GHIN, user_token);

        expect(Axios).toHaveBeenCalledWith(callData);
    });

    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
});
