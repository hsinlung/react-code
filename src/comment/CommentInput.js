import React,{Component} from "react";
// 处理用户输入
class CommentInput extends Component {
/*
* 用户可输入内容一个是用户名（username），一个是评论内容（content），我们在组件的构造函数中初始化一个 state 来保存这两个状态
* React.js 认为所有的状态都应该由 React.js 的 state 控制，
* 只要类似于 <input />、<textarea />、<select /> 这样的输入控件被设置了 value 值，那么它们的值永远以被设置的值为准。值不变，value 就不会变化
* 在 React.js 当中必须要用 setState 才能更新组件的内容，所以我们需要做的就是：监听输入框的 onChange 事件，然后获取到用户输入的内容，
* 再通过 setState 的方式更新 state 中的 username，这样 input 的内容才会更新
* 类似于 <input />、<select />、<textarea> 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）
* 对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。另外还有非受控组件
* */
    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        }
    }
    // 获取username
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    // 获取content
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    // 发布评论
    /*
    * handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性
    * 有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。
    * */
    handleSubmitComment() {
        if(this.props.onSubmit){
            const {username,content} = this.state;
            this.props.onSubmit({username,content});
        }
        // 然后再通过 setState 清空用户输入的评论内容（但为了用户体验，保留输入的用户名）
        this.setState({content:''});
    }

    render() {
        return (
            <div className='comment-input'>
                <h2>CommentInput</h2>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        {/*同样地，让 <textarea /> 成为受控组件*/}
                        <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    {/*所以当用户点击发布按钮的时候，我们就将 CommentInput 的 state 当中最新的评论数据传递给父组件 CommentApp ，
                    然后让父组件把这个数据传递给 CommentList 进行渲染。*/}
                    <button onClick={this.handleSubmitComment.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}
export default CommentInput;