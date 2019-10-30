
export default class PaginationData{
    constructor({current, size}) {
        this.current = current || 1;
        this.size = size || 10;
    }
}
