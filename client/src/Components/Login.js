import axios from 'axios';

import React, { useState, useEffect, useInput } from 'react';
import FormData from 'form-data'
export default function Login() {
    const [email, setTitle] = useState("");
    const [password, setImages] = useState("");

    const updateCaption = (e) => {
        const text = e.target.value || '';
        setTitle(text)
        console.log(text)
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //alert(`Submitting Name ${title}`);
        /*
        resetFirstName();
        resetLastName();*/
        console.log("imggg")
        console.log(images)
        const formData = new FormData();

        formData.append('picture', images);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(`http://localhost:3080/posts/store`, formData, config)
            .then(res => {
                console.log(res.data)
            })
        console.log("hi")
    }
    const handleCha = (evt) => {
        //evt.preventDefault();
        const images = evt.target.files[0];
        setImages(images)
    }
    const handleImgSubmit = (evt) => {
        evt.preventDefault();

        console.log(evt.target.files);
        const formData = new FormData();
        formData.append('myImg', images);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData);
        axios.post(`http://localhost:3080/posts/store`, formData,
            config)
            .then(res => {
                console.log(res.data)
            })
        /*
        resetFirstName();
        resetLastName();*/
        console.log("hi")
    }
    return (
        <form onSubmit={handleSubmit}>

            <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                    <label> Title </label>
                    <input type="text" name="title" placeholder="Title..." className="form-control" onChange={(e) => updateCaption(e)}></input>
                </div>
            </div>
            <div className="control-group">
                <div className="form-group mt-5">
                    <input type="file" name="image" className="form-control-file" onChange={(e) => handleCha(e)}></input>
                </div>

            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}
