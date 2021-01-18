import React, { Component } from "react";
import UserService from "../services/user.service";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { BiCheckCircle, BiXCircle, BiEdit, BiTrash } from "react-icons/bi";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class SinglePost extends Component {
    constructor(props) {
        super(props);
        console.log(props.post.price)
        console.log(typeof (props.post.price))
        this.state = {
            title: props.post.title,
            price: props.post.price,
            url: props.post.url,
            isInEditMode: false
        };
        this.changeEditMode = this.changeEditMode.bind(this);
        this.renderEditView = this.renderEditView.bind(this);
        this.renderDefaultView = this.renderDefaultView.bind(this);
        this.saveEdit = this.saveEdit.bind(this);

    }

    changeEditMode() {
        this.setState(prevState => ({
            isInEditMode: !prevState.isInEditMode
        }));

    }

    saveEdit() {
        const formData = new FormData();
        formData.append('title', this.refs.updateTitle.value);
        formData.append('price', this.refs.updatePrice.value);

        UserService.editPost(formData, this.props.post.id).then(

            (res) => {
                console.log(res)
                this.setState({
                    title: this.refs.updateTitle.value,
                    price: this.refs.updatePrice.value,
                    isInEditMode: false
                });
            },
            error => {
                console.log("Failed lolz")
            }
        );



    }

    componentDidMount() {

    }
    renderEditView() {
        return <div style={{ display: "flex" }}>
            <label> Title</label>
            <input type="text" defaultValue={this.state.title} ref="updateTitle" />
            <label> Price</label>
            <input type="number" defaultValue={this.state.price} ref="updatePrice" />
            <div style={{ marginLeft: "20px" }} onClick={this.changeEditMode}><BiXCircle /></div>
            <div style={{ marginLeft: "20px" }} onClick={this.saveEdit}><BiCheckCircle /></div>
        </div>
    }
    renderDefaultView() {
        return <>
            <Row xs={1} md={2}>
                <Col>
                    <Card.Subtitle className="mb-2 text-muted">Title</Card.Subtitle>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                    <Card.Title>{this.state.price}</Card.Title>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    <div style={{ marginLeft: "20px" }} onClick={this.changeEditMode}> <BiEdit /></div>
                    <div style={{ marginLeft: "20px" }} onClick={(e) => this.props.removePhoto(e, this.props.post)}><BiTrash /></div>
                </Col>
            </Row>
        </>
    }

    render() {
        return (

            <div >
                <Card style={{ width: '100' }}>
                    <Card.Body>
                        {this.state.isInEditMode ?
                            this.renderEditView() :
                            this.renderDefaultView()
                        }
                    </Card.Body>
                    <Card.Img variant="top" src={this.state.url} />
                </Card>

            </div>
        );
    }
}
