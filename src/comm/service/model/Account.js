export default class Account {
    constructor({i, p}) {
        this.i = i || "";
        this.p = p || "";
        this.t = new Date().getTime();
    }
}
