import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class PostForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const message = this.getMessage.value;
        const data = {
            id: new Date(),
            title,
            message,
            editting: false
        }
        this.props.dispatch({
            type: 'ADD_POST',
            data
        })
        this.getTitle.value = "";
        this.getMessage.value = "";
        // console.log(data);
    }

    render() {
        return (
            <div className='container my-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h1>Create Post</h1>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.handleSubmit}>
                            {/* "(input)" = parameter and store in "this.getTitle" */}
                            <input className="form-control mb-3" type="text" ref={(input) => this.getTitle = input} placeholder='Enter title' required />
                            <textarea className="form-control mb-3" ref={(input) => this.getMessage = input} cols="30" rows="5" placeholder='Enter content' required />
                            <button className="btn btn-success">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PostForm);
//"connect" will let you access to dispatch props