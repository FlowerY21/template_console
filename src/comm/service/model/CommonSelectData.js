import PaginationData from './PaginationData'
export default class CommonSelectData extends PaginationData{
  constructor({current, size, startTime, endTime}) {
    super({current, size});
    this.startTime = startTime || "";
    this.endTime = endTime || "";
  }
}
