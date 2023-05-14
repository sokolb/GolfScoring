import Axios from "axios";

class GhinDataService {
    getUserToken(user, pwd) {
        return Axios({
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
        });
    }

    getUserCourseHandicap(GHIN, user_token) {
        var formattedDate = this.formatDate(new Date());
        return Axios({
            method: "GET",
            url: `https://api2.ghin.com/api/v1/course_handicaps.json?golfer_id=${GHIN}&course_id=749&source=GHINcom&played_at=${formattedDate}`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            data: {
                golfer_id: GHIN,
            },
        });
    }

    getUserHandicap(GHIN, user_token) {
        return Axios({
            method: "GET",
            url: `https://api2.ghin.com/api/v1/golfers.json?status=Active&from_ghin=true&per_page=25&page=1&golfer_id=${GHIN}&includeLowHandicapIndex=true&source=GHINcom`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            data: {
                golfer_id: GHIN,
            },
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
}

export default new GhinDataService();
