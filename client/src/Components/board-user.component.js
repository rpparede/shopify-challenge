import React, { Component } from "react";

import UserService from "../services/user.service";
import SinglePost from "./single-post";
import Pagination from "@material-ui/lab/Pagination";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            page: 1,
            pageSize: 3,
            count: 0,

        };
        this.onRemovePhoto = this.onRemovePhoto.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    componentDidMount() {

        this.retrievePosts();
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
        console.log("Myparams");
        console.log(params);
        UserService.getUserBoard(params).then(
            response => {

                const { posts, totalPages } = response.data;
                console.log("posts")
                console.log(response)
                console.log(posts)
                this.setState({
                    content: posts,
                    count: totalPages,
                }, () => {

                });


            },
            error => {
                console.log(error)

            }
        );
        this.forceUpdate();

    }
    handlePageChange(event, value) {
        console.log("chan")
        console.log(value)
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrievePosts();
            }
        );
        this.forceUpdate();
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


    render() {
        return (
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
                    <SinglePost post={post} removePhoto={this.onRemovePhoto} />
                ))

                }
            </div>
        );

    }
}