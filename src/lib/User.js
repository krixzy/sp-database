export default class User {
    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
        this.viewerLevel = 0;
    }
    sayHi() {
        alert(this.name);
    }
}



