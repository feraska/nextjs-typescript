export interface card {
    backdrop_path?:string,
    original_title?:string,
    poster_path?:string,
    adult?:boolean,
    genre_ids?:Array<number>,
    id:number,
    original_name?:string,
    genres:Array<genere>,
    spoken_languages:Array<lang>
}
export interface lang {
    english_name:string
}
export interface genre {
    name:string
}
export interface genere {
    id:number,
    name:number
}