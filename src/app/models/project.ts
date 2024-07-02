import {ITask} from "./task";
import {ICreatable} from "./creatable";

export interface IProject extends ICreatable{
  state: boolean,
  tasks: ITask[] | undefined
}
