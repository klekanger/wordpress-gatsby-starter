export interface MapFn {
    (key: string, value: any): string;
}
export interface Opts {
    thisArg?: any;
}
export declare class DeepMapKeys {
    private mapFn;
    private opts;
    private cache;
    constructor(mapFn: MapFn, opts: Opts);
    map(value: any): any;
    private mapArray(arr);
    private mapObject(obj);
}
