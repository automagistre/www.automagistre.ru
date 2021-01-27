import { gql } from '@apollo/client';

export const createAppealCooperation = gql`
    mutation createAppealCooperation($input: createAppealCooperationInput!) {
        createAppealCooperation(input: $input) {
            appealId
        }
    }
`;

export const createAppealSchedule = gql`
    mutation createAppealSchedule($input: createAppealScheduleInput!) {
        createAppealSchedule(input: $input) {
            appealId
        }
    }
`;

export const createAppealQuestion = gql`
    mutation createAppealQuestion($input: createAppealQuestionInput!) {
        createAppealQuestion(input: $input) {
            appealId
        }
    }
`;

export const createAppealTireFitting = gql`
    mutation createAppealTireFitting($input: createAppealTireFittingInput!) {
        createAppealTireFitting(input: $input) {
            appealId
        }
    }
`;
export const createAppealCalculator = gql`
    mutation createAppealCalculator($input: createAppealCalculatorInput!) {
        createAppealCalculator(input: $input) {
            appealId
        }
    }
`;

export const createAppealCall = gql`
    mutation createAppealCall($input: createAppealCallInput!) {
        createAppealCall(input: $input) {
            appealId
        }
    }
`;
