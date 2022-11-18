export interface Tag {
    name: string;
    color?: string;
}
export interface Talk {
    text: string;
    speaker?: string;
    tags?: Tag[];
    image?: string;
    createdAt?: Date;
    issueType?: IssueType;
}

// export interface Issue {
//     name: IssueType;
//     color: string;
// }

export enum TaskType {
    // Task = 'task',
    Important = 'important',
    New = 'new',
    Ongoing ='ongoing',
    Done = 'done',
    Pending = 'pending'
}

export interface Track {
    title: string;
    talks: Talk[];
    id: string;
}

export interface Board {
    title: string;
    tracks: Track[];
}