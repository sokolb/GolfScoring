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

    getUserHandicap(GHIN, user_token) {
        return Axios({
            method: "GET",
            url: `https://api2.ghin.com/api/v1/search_golfer.json?golfer_id=${GHIN}`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${user_token}`,
            },
            data: {
                golfer_id: GHIN,
            },
        });
    }
}

export default new GhinDataService();
