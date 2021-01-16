import React, { Component } from "react";
import { Image, Transformation } from 'cloudinary-react';
import UserService from "../services/user.service";
import Card from 'react-bootstrap/Card'
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
                    {this.state.content && this.state.content.map((post, index) => (
                        <Card style={{ width: '100' }}>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src={post.url} />
                        </Card>
                    )
                    )
                    }

                </div>
            </>
        );

    }
}