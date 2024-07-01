import {ITask} from "./task";
import {ICreatable} from "./creatable";

export interface IProject extends ICreatable{
  available: boolean,
  tasks: ITask[]
}
