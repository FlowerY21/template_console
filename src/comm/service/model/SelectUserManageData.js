import CommonSelectData from './CommonSelectData'
export default class SelectUserManageData extends CommonSelectData{
  constructor({current, size, userName, passWord, startTime, endTime}) {
    super({current, size, startTime, endTime});
    this.userName = userName || "";
    this.passWord = passWord || "";
  }
}
