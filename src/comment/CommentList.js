import React,{Component} from "react";
import Comment from './Comment'
// 评论列表
/*
* 我们说过 CommentList 的数据应该是由父组件 CommentApp 传进来的，现在我们删除测试数据，改成从 props 获取评论数据
* */
class CommentList extends Component {
    // 给 CommentList 加上 defaultProps 防止 comments 不传入的情况
    // 但是 CommentInput 给 CommentApp 传递的评论数据并没有传递给 CommentList，所以现在发表评论时没有反应的
    // 我们在 CommentApp 的 state 中初始化一个数组，来保存所有的评论数据，并且通过 props 把它传递给 CommentList
    static defaultProps = {
        comments: []
    }

    render() {
        const comments = [
            {username: "Jerry", content: "Hello"},
            {username: "Tomy", content: "World"},
            {username: "Lucy", content: "Good"}
        ]
        return (
            <div>
                <h2>CommentList</h2>
                {this.props.comments.map((comment,i)=><Comment comment={comment} key={i} />)}
            </div>
        )
    }
}
export default CommentList;