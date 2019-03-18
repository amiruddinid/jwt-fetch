import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search'

class App extends Component {
  state = {
    data:'',
    username:'',
    password:'',
    token:'',
    category:''
  }

  handleInput = (event) => {
    this.setState({data:event.target.value})
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
       username: this.state.username,
       password: this.state.password 
      })
    })
    .then(response => response.json())
    .then((result) => {
        if(result.success){
          this.setState({
            token: result.data.token
          })
        }
    })
  }
  handleCreate = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/category', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Token ' + this.state.token
      },
      body:JSON.stringify({
       name: this.state.category
      })
    })
    .then(response => response.json())
    .then((result) => {
        console.log(result)
    })
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            !this.state.token && 
            <form onSubmit={this.handleSubmit}>
              <input name="idpeg" type="text" onChange={this.handleChange}/>
              <input name="password" type="password" onChange={this.handleChange}/>
              <button type="submit">Login</button>
            </form>
          }
          {
            this.state.token &&
            <form onSubmit={this.handleCreate}>
              <input name="category" type="text" onChange={this.handleChange}/>
              <button type="submit">Create</button>
            </form>
          }
          <p>
            Hasil Search : {this.state.data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
