import gql from 'graphql-tag';

export const isCheckedRec = gql`
    fragment isCheckedRec on Recommendation {
        isChecked
    }`;

export const isCheckedPartItem = gql`
    fragment isCheckedPartItem on PartItem {
        isChecked
    }`;
