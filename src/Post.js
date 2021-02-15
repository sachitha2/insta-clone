import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username,caption,imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Sachitha Hirushan"
                    src="https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg"
                />
                <h3>{username}</h3>
                {/* header -> avatar + username */}

            </div>

            <img className="post__image" src={imageUrl} alt=""/>
            {/* image */}

            <h4 className="post__text"><strong>{username} </strong>  {caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
