import React from 'react'

export default class sidePanel extends React.Component {
  render() {
    return (
      <div style={STYLES.container}>
        this is casket for the side panel......, minWidth:500px, close button
      </div>
    )
  }
}
const STYLES = {
  container: {
    display: 'fixed',
  },
}
