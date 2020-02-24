import {observable, action, decorate} from "mobx";

class ObservableTokenStore {
    token = '';

    getToken() {
        if(!this.token) {
            this.token = localStorage.getItem("token");
        }

        return this.token;
    }

    saveToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    removeToken() {
        this.token = '';
        localStorage.removeItem('token');
    }
}
decorate(ObservableTokenStore, {
    token: observable,
    getToken: action,
    saveToken: action,
    removeToken: action
});

const TokenStore = new ObservableTokenStore();
export default TokenStore;