import {IDate} from "./date";
import {ICreatable} from "./creatable";
import {IProject} from "./project";

export interface ITask extends ICreatable{
  limitDate: IDate,
  taskState: number,
  project: number,
  userID: number,
}
