import React, { Component } from "react";
import { Image, Transformation } from 'cloudinary-react';
import UserService from "../services/user.service";
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Pagination from "@material-ui/lab/Pagination";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            page: 1,
            pageSize: 3,
            count: 0
        };
        this.retrievePosts = this.retrievePosts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    componentDidMount() {
        this.retrievePosts()
    }
    getRequestParams(page, pageSize) {
        let params = {};

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrievePosts() {
        const params = this.getRequestParams(this.state.page, this.state.pageSize);
        UserService.getPublicContent(params).then(
            response => {
                console.log(response)
                const { posts, totalPages } = response.data;
                console.log("poststttttt")
                console.log(posts)
                this.setState({
                    content: posts,
                    count: totalPages,
                });

            },
            error => {

            }
        );
    }
    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrievePosts();
            }
        );
    }
    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrievePosts();
            }
        );
    }
    render() {

        return (
            <>
                <div className="container">
                    <Pagination
                        className="my-3"
                        count={this.state.count}
                        page={this.state.page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={this.handlePageChange}
                    />
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