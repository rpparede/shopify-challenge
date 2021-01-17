import React, { Component } from "react";
import { Image, Transformation } from 'cloudinary-react';
import UserService from "../services/user.service";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
                                <Row xs={1} md={2}>
                                    <Col>
                                        <Card.Subtitle className="mb-2 text-muted">Title</Card.Subtitle>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                                        <Card.Title>{parseInt(post.price) > 0 ? `$ ${post.price}` : "FREE"}
                                        </Card.Title>
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <Card.Subtitle className="mb-2 text-muted">User</Card.Subtitle>
                                        <Card.Title>{post["user.username"]}</Card.Title>
                                        {parseInt(post.price) > 0 && <a href={"mailto:" + post["user.email"]}>Purchase</a>}
                                    </Col>
                                </Row>
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