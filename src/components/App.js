import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api/posts'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    
  }
  
  componentDidMount() {
    axios.get(this.state.baseUrl).then(res => {
      this.setState({posts: res.data})
    });
  }

  updatePost(id, text) {
  axios.put(`${this.state.baseUrl}?id=${id}`, {text }).then(res => {this.setState({posts: res.data})}
  )
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}?id=${id}`).then(res => {
      this.setState({posts: res.data})
    })

  }

  createPost( text ) {
axios.post(`${this.state.baseUrl}`, {text}).then(res => {
  this.setState({post: res.data})
})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
          createPostFn={this.createPost} />

          {
            posts.map( post => (<Post key={post.id}
              text={ post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn ={this.deletePost} />))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
