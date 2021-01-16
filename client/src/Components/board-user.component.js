import React, { Component } from "react";

import UserService from "../services/user.service";

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
                <header className="jumbotron">
                    {this.state.content && this.state.content.map((post, index) => (
                        <div key={index}>
                            <h2 > {post.title}</h2>
                            <div style={{ maxHeight: "500px", maxWidth: "500px", overflow: "hidden" }}>
                                <img alt='img' src={post.url} />
                            </div>
                            <button type="submit" onClick={e => this.onRemovePhoto(e, post)}>
                                Delete
                             </button>

                        </div>
                    ))

                    }
                </header>
            </div>
        );
    }
}