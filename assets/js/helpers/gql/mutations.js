import { gql } from '@apollo/client'

export const createAppealCooperation = gql`
    mutation createAppealCooperation($input: createAppealCooperationInput!) {
        createAppealCooperation(input: $input) {
            appealId
        }
    }
`
