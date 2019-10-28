export default class SubmitText {
    constructor({loadingText, successText, failTitle, failText}) {
        this.loadingText = loadingText || "提交中...";
        this.failTitle = failTitle || "请求失败";
        this.successText = successText;
        this.failText = failText;
    }
}
