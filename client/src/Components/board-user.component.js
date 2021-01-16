import React, { Component } from "react";

import UserService from "../services/user.service";
import SinglePost from "./single-post";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
        this.onRemovePhoto = this.onRemovePhoto.bind(this);
    }
    onRemovePhoto(e, post) {

        UserService.deletePost(post.id.toString()).then(
            response => {
                this.setState(previousState => {
                    return {
                        content: previousState.content.filter(m => m.id !== post.id)
                    };
                });
            },
            error => {

            }
        );
        console.log(post)
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data.posts
                });
            },
            error => {

            }
        );
    }

    render() {
        return (
            <div className="container">
                {this.state.content && this.state.content.map((post, index) => (
                    <SinglePost post={post} removePhoto={this.onRemovePhoto} />
                ))

                }
            </div>
        );

    }
}