import React from 'react'
import './post.css'
import {Artcle} from '../../models/article'

interface PostProps {
    article: Array<Artcle>
    loading: boolean
}

const Post: React.FunctionComponent<PostProps> = (props) => {
    const { article, loading } = props
    if(loading) {
        return <h2>loading</h2>
    }

    return (
        <ul className="list-posts">
            {
                article.map((v) => {
                    return (
                        <li key={v.id} className="list-posts-item">
                            <h3>{v.title}</h3>
                            <p>{v.content}</p>
                            <p>{v.time}</p>
                            <p>{v.author}</p>
                            <p>{v.like}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Post