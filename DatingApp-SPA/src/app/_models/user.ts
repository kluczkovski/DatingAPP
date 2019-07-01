import { Photo } from './photo';

export interface User {
    userId: number;
    userName: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActi: Date;
    photoUrl: string;
    city: string;
    country: string;

    // Details
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];

}
