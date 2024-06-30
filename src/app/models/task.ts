export interface ITask {
                id: number;
                title: string;
                description: string;
                limitDate: Date;
                taskState: number;
                project: number;
                userID : number;
                links: [];
                
            }
            