import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import EditComponent from './EditComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class AllPost extends Component {
    render() {
        return (
            <div className='container'>
                <h1>All Post</h1>
                {this.props.posts.map((post) => 
                    <div key={post.id}>
                        {post.editting ? <EditComponent key={post.id} post={post} /> : <Post key={post.id} post={post}/>}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(AllPost);