
import { isString } from 'src/app/core/functions';
import { ApiInterface } from './tab1.interface';

export class Api {
    name: string;
    avatar_url: string;
    bio: string;

    constructor(data: ApiInterface) {
        this.name = isString(data.name);
        this.avatar_url = isString(data.avatar_url);
        this.bio = isString(data.bio);
    }
}


