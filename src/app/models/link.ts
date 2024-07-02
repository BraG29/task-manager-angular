import {IDate} from "./date";
import {ICreatable} from "./creatable";
import {IUser} from "./user";

export interface ILink {
  id: number | null,
  creationDate: IDate | null,
  role: number,
  creatable: ICreatable | null,
  user: IUser
}
