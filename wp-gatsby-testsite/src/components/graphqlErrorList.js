import React from "react"

const GraphqlErrorList = ({ errors }) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map(error => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
)

export default GraphqlErrorList
