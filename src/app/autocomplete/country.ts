export class Country {

    get size(): number {
        return this.name.length;
    }
    constructor(
        public id: number,
        public name: string,
        public code: string
    ) {}
}