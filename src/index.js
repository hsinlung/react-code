/*
* 引入了 React 和 React.js 的组件父类 Component
* 只要你要写 React.js 组件，那么就必须要引入这两个东西
* */
import React,{ Component } from "react";
/*
* ReactDOM 可以帮助我们把 React 组件渲染到页面上去，没有其它的作用了
* */
import ReactDOM from "react-dom";
import CommentApp from "./comment/CommentApp";
import './index.css';

/*
* 函数式组件
* 以前一个组件是通过继承 Component 来构建，一个子类就是一个组件。
* 而用函数式的组件编写方式是一个函数就是一个组件，你可以和以前一样通过 <HellWorld /> 使用该组件。
* 不同的是，函数式组件只能接受 props 而无法像跟类组件一样可以在 constructor 里面初始化 state
* 你可以理解函数式组件就是一种只能接受 props 和提供 render 方法的类组件
* */
const HelloWord = (props) => {
    const sayHi = (event) => alert('Hi');
    return (
        <div onClick={sayHi}>Hello World!</div>
    )
}

// Title组件
class Title extends Component{
    render(){
        return (
            <h1>Title组件</h1>
        )
    }
}

// Button组件
class LikeButton extends Component{
    /*
    * 默认配置 defaultProps
    * 上面的组件默认配置我们是通过 || 操作符来实现。
    * 这种需要默认配置的情况在 React.js 中非常常见，所以 React.js 也提供了一种方式 defaultProps，可以方便的做到默认配置。
    * defaultProps 作为点赞按钮组件的类属性，里面是对 props 中各个属性的默认配置。
    * 这样我们就不需要判断配置属性是否传进来了：如果没有传进来，会直接使用 defaultProps 中的默认属性。
    * 所以可以看到，在 render 函数中，我们会直接使用 this.props 而不需要再做判断
    * */
    static defaultProps = {
        likedText: '取消',
        unlikedText: '点赞'
    }
    constructor() {
        super();
        /*
        * isLiked 存放在实例的 state 对象当中，这个对象在构造函数里面初始化。
        * 传入一个对象的时候，这个对象表示该组件的新状态。
        * 但你只需要传入需要更新的部分就可以了，而不需要传入整个对象。例如，假设现在我们有另外一个状态 name
        * */
        this.state = {
            name: '小明',
            isLiked: false
        };
    }
    handleClickOnLikeButton(){
        /*
        * setState 接受对象参数
        * 在 handleClickOnLikeButton 事件监听函数里面，大家可以留意到，我们调用了 setState 函数，
        * 每次点击都会更新 isLiked 属性为 !isLiked，这样就可以做到点赞和取消功能。
        * setState 方法由父类 Component 所提供。
        * 当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上。
        * 注意，当我们要改变组件的状态的时候，不能直接用 this.state = xxx 这种方式来修改，如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面。
        * 一定要使用 React.js 提供的 setState 方法，它接受一个对象或者函数作为参数
        * 因为点击的时候我们并不需要修改 name，所以只需要传入 isLiked 就行了。小明 还是那个 小明，而 isLiked 已经不是那个 isLiked 了
        * */

        /*
        * 要注意的是，当你调用 setState 的时候，React.js 并不会马上修改 state
        * 而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。
        * 你会发现两次打印的都是 false，即使我们中间已经 setState 过一次了。
        * 这并不是什么 bug，只是 React.js 的 setState 把你的传进来的状态缓存起来，稍后才会帮你更新到 state 上，所以你获取到的还是原来的 isLiked
        * 所以如果你想在 setState 之后使用新的 state 来做后续运算就做不到了
        * */
        // console.log(this.state.isLiked)
        this.setState({
            isLiked: !this.state.isLiked
        })
        // console.log(this.state.isLiked)

        /*
        * 这里就自然地引出了 setState 的第二种使用方式，可以接受一个函数作为参数。
        * React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象：
        * */
        this.setState((prevState)=>{
            return { count: 0 }
        })
        this.setState((prevState) => {
            return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
        })
        this.setState((prevState) => {
            return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
        })
        // console.log(this.state.count)
        /*
        * 上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；
        * 这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。
        * 深层的原理并不需要过多纠结，你只需要记住的是：在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题。
        * */

        /*
        * 如何让组件能适应不同场景下的需求，我们就要让组件具有一定的“可配置”性
        * 配置组件的 props
        * 每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置。
        * */

    }
    render(){
        // 这个组件的 render 函数内，会根据组件的 state 的中的isLiked不同显示“取消”或“点赞”内容。
        // 并且给 button 加上了点击的事件监听

        // [可配置性]
        // const likeText = this.props.likedText || '取消'
        // const unLikeText = this.props.unlikedText || '点赞'
        // 这时候，点赞按钮的内部就要用 this.props.wordings 来获取到到参数了
        const wordings = this.props.wordings || {
            likedText: '取消',
            unlikedText: '点赞'
        }
        /*
        * 这样可以通过 this.props.onClick 获取到这个传进去的函数，修改 LikeButton 的 handleClickOnLikeButton 方法：
        * 当每次点击按钮的时候，控制台会显示 Click on like button! 。但这个行为不是点赞组件自己实现的，而是我们传进去的。
        * 所以，一个组件的行为、显示形态都可以用 props 来控制，就可以达到很好的可配置性
        * */
        if(this.props.onClick){
            this.props.onClick()
        }

        /*
        * 从 render 函数可以看出来，组件内部是通过 this.props 的方式获取到组件的参数的
        * 如果 this.props 里面有需要的属性我们就采用相应的属性，没有的话就用默认的属性。
        * */
        return (
            <button onClick={this.handleClickOnLikeButton.bind(this)}>
                {this.state.isLiked ? this.props.likedText : this.props.unlikedText} 👍[{this.state.name}]
            </button>
        )
    }
}

/*
* 一个组件继承 Component 类，有一个 render 方法，并且把这个组件的 HTML 结构返回；
* 这种看起来“在 JavaScript 写的标签的”语法叫 JSX
* JSX 原理
*   HTML 的信息和 JavaScript 所包含的结构和信息其实是一样的
*   我们可以用 JavaScript 对象来描述所有能用 HTML 表示的 UI 信息
*   但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了
*   于是 React.js 就把 JavaScript 的语法扩展了一下
*   让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法
*   编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构
*   经过编译以后会变成
*       class Header extends Component {
          render () {
            return (
             React.createElement(
                "div",
                null,
                React.createElement(
                  "h1",
                  { className: 'title' },
                  "Hello World!"
                )
              )
            )
          }
        }
          ReactDOM.render(
          React.createElement(Header, null),
          document.getElementById('root')
        );
      React.createElement 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等。
      这样的代码就是合法的 JavaScript 代码了。所以使用 React 和 JSX 的时候一定要经过编译的过程。
      所谓的 JSX 其实就是 JavaScript 对象
* */
// Header组件
class Header extends Component{
    // 你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果
    constructor() {
        super();
        this.state = {
            likedText: '已赞',
            unlikedText: '赞'
        }
    }
    handleClickOnChange() {
        this.setState(
            {
                likedText: '取消03',
                unlikedText: '点赞03'
            }
        )
    }
    renderGoodWord(goodWord, badWord) {
        const isGoodWord = true;
        return isGoodWord ? goodWord : badWord;
    }
    handleClick(){
        alert('点击了');
    }
    handleMouseOver(){
        console.log('鼠标移入');
    }
    handleClickTitle(e){
        console.log(e.target.innerHTML);
    //    关于事件中的 this
        /*
        * 一般在某个类的实例方法里面的 this 指的是这个实例本身。
        * 但是你在上面的 handleClickOnTitle 中把 this 打印出来，你会看到 this 是 null 或者 undefined。
        * 这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），
        * 而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。
        * 如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js
        * */
        console.log(this);
    }
    handleClickTitle2(e,word){
        console.log(this,word);
    }
    render(){
        /*
        * 1.在 JSX 当中你可以插入 JavaScript 的表达式，表达式返回的结果会相应地渲染到页面上。表达式用 {} 包裹。
        * 2.你也可以把它写成一个函数表达式返回
        * 3.{} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等,也可以放 JSX
        * 如果你在表达式插入里面返回 null ，那么 React.js 会什么都不显示，相当于忽略了该表达式插入。
        * render 会把这些代码返回的内容如实地渲染到页面上，非常的灵活。
        * 4.表达式插入不仅仅可以用在标签内部，也可以用在标签的属性上
        *     注意，直接使用 class 在 React.js 的元素上添加类名如 <div class=“xxx”> 这种方式是不合法的。
        * 因为 class 是 JavaScript 的关键字，所以 React.js 中定义了一种新的方式：className 来帮助我们给元素添加类名
        *     还有一个特例就是 for 属性，例如 <label for='male'>Male</label>，因为 for 也是 JavaScript 的关键字，
        * 所以在 JSX 用 htmlFor 替代，即 <label htmlFor='male'>Male</label>。而其他的 HTML 属性例如 style 、data-* 等就可以像普通的 HTML 属性那样直接添加上去。
        * 5.如果你能理解 JSX 元素就是 JavaScript 对象
        * JSX 元素其实可以像 JavaScript 对象那样自由地赋值给变量，或者作为函数参数传递、或者作为函数的返回值
        * */
        const title = 'Hello World!';
        const className = 'title';
        const isShow = false;
        const isGood = <strong>function is Good</strong>
        const notGood = <span>not Good</span>;
        return(
            <div>
                {/*可以直接在 Header 标签里面直接使用 Title 标签，就像是一个普通的标签一样*/}
                {/*自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头*/}
                <Title/>
                <h1 className={className}>{ title }</h1>
                <p>{ function () {
                    return 'Hello Function!'
                }() }</p>
                <label htmlFor='male'>Male</label>
                { isShow ?
                  <strong>展示</strong>
                  : null
                }
                <p>{
                    isShow ? isGood : notGood
                }</p>
                <p>{ this.renderGoodWord(isGood, notGood) }</p>
            {/* React.js 里面监听事件是很容易的事情，你只需要给需要监听事件的元素加上属性类似于 onClick、onKeyDown 这样的属性 */}
            {/* 在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。React.js 帮我们封装好了一系列的 on* 的属性，
            当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 on* 就可以了。而且你不需要考虑不同浏览器兼容性的问题，
            React.js 都帮我们封装好这些细节了   */}
                {/*要注意的是，这些事件属性名都必须要用驼峰命名法*/}
                {/*不同类型的事件 https://facebook.github.io/react/docs/events.html#supported-events*/}
                {/*这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上
                <Header onClick={…} /> 这样的写法不会有什么效果的,但是有办法可以做到这样的绑定
                */}
                <button onClick={ () => { alert('Hello World!') } }>Click Me</button>
                <h1 onClick={this.handleClick}>测试点击事件</h1>
                {/*<h2 onMouseOver={this.handleMouseOver}>测试鼠标移入事件</h2>*/}
            {/*  event 对象  */}
            {/*    React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性，
                这样你就不用考虑不同浏览器的兼容性问题。这个 event 对象是符合 W3C 标准（ W3C UI Events ）的，
                它具有类似于event.stopPropagation、event.preventDefault 这种常用的方法*/}
                <h3 onClick={this.handleClickTitle}>测试点击事件</h3>
                {/*如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js
                    bind 会把实例方法绑定到当前实例上，然后我们再把绑定后的函数传给 React.js 的 onClick 事件监听。
                    你也可以在 bind 的时候给事件监听函数传入一些参数
                    bind 不仅可以帮我们把事件监听方法中的 this 绑定到当前组件实例上；
                    还可以帮助我们在在渲染列表元素的时候，把列表元素传入事件监听函数当中
                */}
                <h4 onClick={this.handleClickTitle.bind(this)}>手动地将实例方法 bind 到当前实例</h4>
                <h4 onClick={this.handleClickTitle2.bind(this,'你好')}>把列表元素传入事件监听函数当中</h4>
                <h1>state</h1>
                {/*在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值
                就像你在用普通的 HTML 标签的属性一样，可以把参数放在表示组件的标签上，组件内部就可以通过 this.props 来访问到这些配置参数了
                JSX 的表达式插入可以在标签属性上使用
                其实可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等
                */}
                {/*<LikeButton likedText='已赞' unlikedText='赞' />*/}
                {/*现在我们把一个对象传给点赞组件作为参数
                现在我们把 likedText 和 unlikedText 这两个参数封装到一个叫 wordings 的对象参数内，然后传入点赞组件中。
                大家看到 {{likedText: '已赞', unlikedText: '赞'}} 这样的代码的时候，不要以为是什么新语法。
                之前讨论过，JSX 的 {} 内可以嵌入任何表达式，{{}} 就是在 {} 内部用对象字面量返回一个对象而已
                */}
                {/*甚至可以往组件内部传入函数作为参数：*/}
                <LikeButton
                    wordings={{likedText:'已赞02',unlikedText:'赞02'}}
                    onClick={() => console.log('点击了点赞按钮！')}
                />
                <p></p>
                {/*
                    在这里，我们把 Index 的 state 中的 likedText 和 unlikedText 传给 LikeButton 。
                    Index 还有另外一个按钮，点击这个按钮会通过 setState 修改 Index 的 state 中的两个属性。
                    由于 setState 会导致 Index 重新渲染，所以 LikedButton 会接收到新的 props，并且重新渲染，
                    于是它的显示形态也会得到更新。这就是通过重新渲染的方式来传入新的 props 从而达到修改 LikedButton 显示形态的效果
                */}
                <LikeButton likedText={this.state.likedText} unlikedText={this.state.unlikedText} />
                <div>
                    <button onClick={this.handleClickOnChange.bind(this)}>修改wordings</button>
                </div>

            </div>
        )
        /*
        * {} 可以放 JSX
        * */
    }
}
// 列表组件
class List extends Component{
    render(){
        const users = [
            {id:1,name:'Jerry',age:21},
            {id:2,name:'Tomy',age:22},
            {id:3,name:'Lucy',age:23}
        ]
        // 保存渲染后的jsx数组
        /*
        * 这里用了一个新的数组 jsxArr，然后循环 users 数组，
        * 为每个 user 构建一个 JSX 结构，然后 push 到 jsxArr 中。
        * 然后直接用表达式插入，把这个 jsxArr 插到 return 的 JSX 当中。
        * 因为 React.js 会自动化帮我们把数组当中的 JSX 罗列渲染出来
        * */
        const jsxArr = []
        for(let user of users){
            jsxArr.push(
                <div>
                    <div>ID：{user.id}</div>
                    <div>姓名：{user.name}</div>
                    <div>年龄：{user.age}</div>
                    <hr />
                </div>
            )
        }
        return (
            <div>
                <h2>列表组件</h2>
                {/*如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来*/}
                {[
                    <div>React.js</div>,
                    <div>React.js</div>,
                    <div>React.js</div>,
                ]}
            {/*  表达式插入  */}
                {jsxArr}

                <h2>map 函数</h2>

            {/* 但我们一般不会手动写循环来构建列表的 JSX 结构，可以直接用 ES6 自带的 map（不了解 map 函数的同学可以先了解相关的知识再来回顾这里），代码可以简化*/}

                {
                    users.map((user) => {
                        return (
                            <div>
                                <div>ID：{user.id}</div>
                                <div>姓名：{user.name}</div>
                                <div>年龄：{user.age}</div>
                                <hr />
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}

// user 组件
const users = [
    {id:111,name:'Jerry',age:21},
    {id:211,name:'Tomy',age:22},
    {id:311,name:'Lucy',age:23}
]
class User extends Component{
    render() {
        const { user } = this.props
        return (
            <div>
                <div>ID：{user.id}</div>
                <div>姓名：{user.name}</div>
                <div>年龄：{user.age}</div>
                <hr />
            </div>
        )
    }
}
// Index组件
/*
* 理解组件树的概念对后面理解数据是如何在组件树内自上往下流动过程很重要
* */
class Index extends Component{
    render(){
        return(
           // 基础部分
           // <div>
           //     {/* 组件可以和组件组合在一起 */}
           //     <Title />
           //     <Header />
           //     {/*函数式组件*/}
           //     <HelloWord />
           //     <List /> {/*列表组件*/}
           // {/*  渲染单独一个用户的结构抽离出来作为一个组件  */}
           // {/* 这里把负责展示用户数据的 JSX 结构抽离成一个组件 User
           //      并且通过 props 把 user 数据作为组件的配置参数传进去
           //      这样改写 Index 就非常清晰了，看一眼就知道负责渲染 users 列表，而用的组件是 User
           //      在上面的例子当中，每个 user 没有 id 可以用，可以直接用循环计数器 i 作为 key
           //      记住一点：在实际项目当中，如果你的数据顺序可能发生变化，标准做法是最好是后台数据返回的 id 作为列表元素的 key
           //    */}
           //     {users.map((user,i)=><User key={i} user={user} />)}
           // </div>
            <div>
                <CommentApp />
            </div>
        )
    }
}
/*
* ReactDOM.render
* 有了这个表示 HTML 结构和信息的对象以后，就可以拿去构造真正的 DOM 元素，然后把这个 DOM 元素塞到页面上
* ReactDOM.render 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上（在这里是 id 为 root 的 div 元素）
* */
ReactDOM.render(<Index />,document.getElementById('root'));
/*
* 为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？
*   第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，
* 我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，
* 可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。
*   第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，
* 而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。
* */
