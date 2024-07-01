import { IDate } from "./date";

export interface ITask {
                id: number;
                title: string;
                description: string;
                limitDate: IDate;
                taskState: number;
                project: number;
                userID : number;
                links: [];    
            }
            