import React, { Component } from 'react';
import User from './components/User';
import './App.css';
import Followers from './components/Followers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      github: {
          avatar_url: '',
          bio: '',
          blog: '',
          followers_url: '',
          following_url: '',
          html_url: '',
          repos_url: '',
          login: '',
          name: ''
        },
      repos: [

      ],
      followers: [

      ],
      render: false
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/users/ConfusionOrb221')
      .then(res => {
        return res.json();
      })
      .then(myJson => {
        this.setState({github: myJson});
        return this.state.github.followers_url
      })
      .then(followers => {
        fetch(followers)
        .then(resFollowers => {
          return resFollowers.json();
        })
        .then(myJsonFollowers => {
          this.setState({followers: myJsonFollowers})
          return this.state.github.repos_url;
        })
        .then(reposUrl =>{
          fetch(reposUrl)
          .then(resRepos => {
            return resRepos.json()
          })
          .then(jsonRepo => {
            this.setState({repos: jsonRepo, render: true})
            console.log(this.state);
          })
        })
      })
  }

  renderUser(){
    return(
      <div className="user">
        <span className="card">
          <h1> {this.state.github.name} </h1>
          GitHub: <a href={this.state.github.html_url}> {this.state.github.login} </a>
        </span>
        <img alt="user" src={this.state.github.avatar_url}></img>
        <ul>
          <li> Projects </li>
          {this.state.repos.map((data,index) => {
            if(index >= 5){
            }
            else{
              return <li> {data.name} </li>
            }
          })}
        </ul>
      </div>
    )
  }

  renderFollowers(){
    return this.state.followers.map(user =>(
      <div className="user">
        <span className="card">
          <h1> {user.login} </h1>
          GitHub: <a href={user.html_url}> {user.login} </a>
        </span>
        <img alt="user" src={user.avatar_url}></img>
      </div>
    ))
      
  }

  render() {
    if(this.state.render){
      return (
        <div className="App">
          <User renderUser={this.renderUser.bind(this)} />
          <Followers renderFollowers={this.renderFollowers.bind(this)} />
        </div>
      )
    }
    else{
      return(
        <>
          loading...
        </>
      )
    }

    
  }
}

App.propTypes = {

};

export default App;
