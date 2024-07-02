import {ILink} from "./link";

export interface ICreatable {
  id: number | null,
  title: string,
  description: string | null,
  links: ILink[] | undefined
}
