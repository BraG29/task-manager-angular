import {ILink} from "./link";

export interface IUser {
    id: number | null;
    name: string | null;
    lastName: string | null;
    password: string | null;
    email: string | null;
    links : ILink[];
}
