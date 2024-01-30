import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditComponent extends Component {

    handleEdit = (e) => {
        e.preventDefault();
        const newTitle = this.getTitle.value;
        const newMessage = this.getMessage.value;
        const data = {
            newTitle,
            newMessage
        }
        this.props.dispatch({ type: 'UPDATE', id: this.props.post.id, data });
    }
    render() {
        return (
            <div className="card">
                <div className='card-body'>
                    <form onSubmit={this.handleEdit}>
                        {/* "(input)" = parameter and store in "this.getTitle" */}
                        <input className="form-control mb-3" type="text" ref={(input) => this.getTitle = input} defaultValue={this.props.post.title} placeholder='Enter title' required />
                        <textarea className="form-control mb-3" ref={(input) => this.getMessage = input} defaultValue={this.props.post.message} cols="30" rows="5" placeholder='Enter content' required />
                        <button className="btn btn-success">Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(EditComponent);