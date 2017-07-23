import React, {Component} from 'react'
import { Button } from 'antd'
import { Link, hashHistory } from 'react-router'
import store from './../../utils/store.js'
import './index.scss'

import loginBg from './../../assets/login_bg.png'

const bgStyle = {
  backgroundImage: `url(${loginBg})`
}

class Home extends Component {
	constructor(props) {
		super(props);

    this.state = {
      isAnswer: false
    }

    this.socket = io()
    this.answer = this.answer.bind(this)
    this.resetBtn = this.resetBtn.bind(this)
	}

  componentDidMount() {
    this.userNumber = store.get("userNumber")
    this.userName = store.get("userName")

    // 相关信息不存在，进入登录页面
    if (!this.userNumber || !this.userName) {
      hashHistory.push("/login")
    }  

    // 服务器端触发重置事件，按钮重置
    this.socket.on('reset', this.resetBtn)
  }

  componentWillUnmount() {
    this.socket.removeListener('reset', this.resetBtn)
  }

  resetBtn() {
    // 重置抢答按钮
    store.remove("isAnswer")
    this.setState({ isAnswer: false })
  }

  answer() {
    let formData = new FormData(),
        currentTime = new Date()

    let timeStamp = `${currentTime.getHours()}：${currentTime.getMinutes()}：${currentTime.getSeconds()}：${currentTime.getMilliseconds()}`
    
    let answerData = {
      userNumber: this.userNumber,
      userName: this.userName,
      timeStamp: timeStamp
    }

    // 触发服务器事件
    this.socket.emit('answer', answerData)
    this.setState({ isAnswer: true })
    store.set("isAnswer", "true")
  }

	render() {
    const isAnswer = this.state.isAnswer || store.get("isAnswer")
    
    return (
    	<div className="home-page" style={bgStyle}>
        <div className="home-header">
          <div className="header-logo">
            <img src={require('./../../assets/logo.jpg')} />
          </div>

          <div className="header-png">
            <img src={require('./../../assets/baiji.png')} />
          </div>
        </div>

        <div className="answer-btn">
          <Button disabled={isAnswer} type="primary" onClick={this.answer}>抢答</Button>
        </div>

        <Link to="/result" className="result-btn">
          <Button type="primary">查看结果</Button>
        </Link>
    	</div>
    )
	}
}

export default Home