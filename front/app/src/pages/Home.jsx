import React from 'react';
import './styles/Home.css'; // Importing the corresponding CSS file

const Home = () => {
    const posts = [
        {
            id: 1,
            titre: "Post Title 1",
            descr: "Description for post 1",
            Image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            titre: "Post Title 2",
            descr: "Description for post 2",
            Image: "https://via.placeholder.com/150"
        }
    ];

    return (
        <div className="Posts">
            {posts.map((post) => 
                <div className="post" key={post.id}>
                    <div className="images">
                        <img src={post.Image} alt={post.titre} />
                    </div>
                    <div className="contenu">
                        <h2>{post.titre}</h2>
                        <p>{post.descr}</p>
                        <button>Read more</button>
                    </div>
               </div>
            )}
        </div>
    );
}

export default Home;
