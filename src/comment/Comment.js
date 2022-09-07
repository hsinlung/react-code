import React,{Component} from "react";
// 评论 负责具体每条评论内容的渲染
class Comment extends Component {
    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>:
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        )
    }
}
export default Comment;