import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from '../services/auth-header';
import axios from 'axios';
import UserService from "../services/user.service";
import SinglePost from "./single-post";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);

        this.state = {
            title: "",
            image: null,
            loading: false,
            message: "",
            price: 0
        };
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.files[0]
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();


        const formData = new FormData();

        formData.append('picture', this.state.image);
        formData.append('title', this.state.title);
        formData.append('price', this.state.price);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        UserService.createPost(formData, config).then(

            (res) => {
                console.log(res)
                this.setState({
                    loading: false,
                    message: "Success"
                });
                this.props.history.push("/user");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );

    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Price (CAD)</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="price"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <Input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={this.onChangeImage}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Post</span>
                            </button>
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                    </Form>
                </div>
            </div>
        );
    }
}