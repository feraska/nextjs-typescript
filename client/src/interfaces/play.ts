import { card } from "./card";

export interface play {
    dates:{
        maximum:Date,
        minimum:Date,
    },
    results:Array<card>,
    genres:[]
    
}