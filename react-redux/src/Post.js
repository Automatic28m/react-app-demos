import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
    render() {
        return (
            <div className='card mb-3'>
                <div className='card-body'>
                    <h2>{this.props.post.title}</h2>
                    <p>{this.props.post.message}</p>
                    <div className='d-flex gap-1'>
                        <button className='btn btn-primary' onClick={() => this.props.dispatch({ type: 'EDIT_POST', id: this.props.post.id })}>Edit</button>
                        <button className='btn btn-danger' onClick={() => this.props.dispatch({ type: 'DELETE_POST', id: this.props.post.id })}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Post);