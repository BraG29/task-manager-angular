import {ILink} from "./link";

export interface ICreatable {
  id: number,
  title: string,
  description: string,
  links: ILink[]
}
