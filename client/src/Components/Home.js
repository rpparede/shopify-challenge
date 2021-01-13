import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log("fetching")
        axios.get(`http://localhost:3080/`)
            .then(res => {
                setPosts(res.data)
            })
    }, []);
    return (
        <div>
            {posts.map(post =>
                <div key={post.id}>
                    <div class="post-preview">
                        <a href="/post/{{post._id}}">
                            <h2 class="post-title">
                                {post.title}
                            </h2>
                            <h3 class="post-subtitle">{post.img}</h3>
                        </a>

                    </div>
                </div>
            )}
        </div>
    );
}
export default Home;