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
}

export default new GhinDataService();
