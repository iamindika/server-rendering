import React, { Component } from 'react'
import { fetchPopularRepos } from '../shared/api' 

export default class Grid extends Component {
  constructor(props) {
    super(props)

    let repos

    if(__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }

  fetchRepos(lang) {
    this.setState({ loading: true })

    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState({ 
          repos,
          loading: false 
        })
      })
  }

  componentDidMount() {
    if(!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props

    if(nextProps.match.params.id !== match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  render() {
    const { repos, loading } = this.state;

    if(loading) {
      return <h1>LOADING</h1>
    }

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