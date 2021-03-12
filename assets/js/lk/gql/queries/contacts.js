import gql from 'graphql-tag';

export const GET_USER_CONTACTS = gql`
  query getUserContacts {
      user {
          id
          name
          surname
          mobilePhone 
          mobilePhone
      }
  }
`
export const UPDATE_USER_CONTACTS = gql`
  mutation updateUserContacts($userContacts: updateUserInput!){
      updateUser(input: $userContacts) {
          id
          name
          surname
          mobilePhone
          email
      }
  }
`
