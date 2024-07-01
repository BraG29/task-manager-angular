import {IDate} from "./date";
import {ICreatable} from "./creatable";
import {IUser} from "./user";

export interface ILink {
  id: number,
  creationDate: IDate,
  role: number,
  creatable: ICreatable,
  user: IUser
}
