import { Org } from '../org/org';

export class User {
    id: string;
    userCode: string;
    userName: string;
    password: string;
    nickName: string;
    email: string;
    userStatus: string;
    org: Org;
}