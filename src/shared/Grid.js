import React, { Component } from 'react'

export default class Grid extends Component {
  render() {
    const repos = this.props.data

    return (
      <ul style={{display: 'flex', 'flexWrap': 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={html_url} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>

          </li>
        ))}
      </ul>
    )
  }
}