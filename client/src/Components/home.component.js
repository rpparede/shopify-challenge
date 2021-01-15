import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
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
            <>
                <div className="container">
                    <header className="jumbotron">
                        {this.state.content && this.state.content.map((post, index) => (
                            <div>
                                <h2 key={index}> {post.title}</h2>
                                <div style={{ maxHeight: "500px", maxWidth: "500px", overflow: "hidden" }}>
                                    <img alt='img' src={post.url} />
                                </div>

                            </div>
                        ))

                        }
                    </header>
                </div>
            </>
        );
    }
}