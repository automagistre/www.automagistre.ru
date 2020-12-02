const {gql} = require('apollo-server')


export default gql`

  scalar Date
  
  type Review {
      _id: String,
      author: String,
      content: String,
      publishAt: Date
  }
`
