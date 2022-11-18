import { IssueType } from './models/schema.model';

export const appConstants = {

    /** Issue Types with ttheir hardcoded colors */
    issueTypeListWithColor: {
        [IssueType.Important]: {
            name: IssueType.Important,
            color: '#99333352'
        },
        [IssueType.Done]: {
            name: IssueType.Done,
            color: '#33996652'
        },
        [IssueType.New]: {
            name: IssueType.New,
            color: '#fff3d4'
        },
        [IssueType.Ongoing]: {
            name: IssueType.Ongoing,
            color: '#99ccff61'
        },
        [IssueType.Pending]: {
            name: IssueType.Pending,
            color: '#3d7e9a4d'
        }
    }
};
