import React from "react"

const Header = ({ siteTitle, siteDesc }) => {
  return (
    <header>
      <h1>{siteTitle}</h1>
      <h3>{siteDesc}</h3>
    </header>
  )
}

export default Header
