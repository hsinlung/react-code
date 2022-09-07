import React,{Component} from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

class CommentApp extends Component {
    // 初始化数组
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }
    handleSubmitComment(comment) {
        console.log(comment);
        // 为了让代码的健壮性更强，给 handleSubmitComment 加入简单的数据检查
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名！')
        if (!comment.content) return alert('请输入评论内容！')
        this.state.comments.push(comment)
        /*
        * 修改 handleSubmitComment ：每当用户发布评论的时候，
        * 就把评论数据插入 this.state.comments 中，然后通过 setState 把数据更新到页面上
        * 这里的代码直接往 state.comments 数组里面插入数据其实违反了 React.js 的 state 不可直接修改的原则
        * 这里为了降低大家的理解成本就不强制使用这个原则
        * */
        this.setState({
            comments:this.state.comments
        })
    }
    render() {
        return (
            <div className="wrapper">
                {/* 在 CommentApp 中给 CommentInput 传入一个 onSubmit 属性
                这个属性值是 CommentApp 自己的一个方法 handleSubmitComment
                这样 CommentInput 就可以调用 this.props.onSubmit(…) 把数据传给 CommenApp
                这样就顺利地把数据传递给了父组件
                */}
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} />
            </div>
        )
    }

}
export default CommentApp;