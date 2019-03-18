import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="search" onChange={this.props.change}></input>
      </div>
    )
  }
}
