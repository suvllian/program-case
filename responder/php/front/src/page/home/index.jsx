import React, {Component} from 'react'
import { Button } from 'antd'
import { Link, hashHistory } from 'react-router'
import store from './../../utils/store.js'
import api from './../../api/'
import './index.scss'
import loginBg from './../../assets/login_bg.png'

const bgStyle = { backgroundImage: `url(${loginBg})` }

class Home extends Component {
	constructor(props) {
		super(props)

    this.state = {
      isAnswer: false
    }

    this.answer = this.answer.bind(this)
    this.resetAnswerBtn = this.resetAnswerBtn.bind(this)
	}

  componentDidMount() {
    this.userNumber = store.get("userNumber")
    this.userName = store.get("userName")

    // 相关信息不存在，进入登录页面
    if (!this.userNumber || !this.userName) {
      hashHistory.push("/login")
    }  
  }

  answer() {
    let formData = new FormData(),
        currentTime = new Date()

    let timeStamp = `${currentTime.getHours()}：${currentTime.getMinutes()}：${currentTime.getSeconds()}：${currentTime.getMilliseconds()}`

    formData.append("userNumber", this.userNumber)
    formData.append("userName", this.userName)
    formData.append("timeStamp", timeStamp)
    api.answer(formData)
    this.setState({
      isAnswer: true
    })
    store.set("isAnswer", "true")
  }

  resetAnswerBtn() {
    this.setState({
      isAnswer: false
    })

    store.remove("isAnswer")
  }

	render() {
    const isAnswer = this.state.isAnswer || store.get("isAnswer")
    
    return (
    	<div className="home-page" style={bgStyle}>
        <div className="answer-btn">
          <Button disabled={isAnswer} type="primary" onClick={this.answer}>抢答</Button>
        </div>
        <Link to="/result" className="result-btn">
          <Button type="primary">查看结果</Button>
        </Link>
        <div className="reset-btn" onClick={this.resetAnswerBtn}>
          <Button type="primary">重置</Button>
        </div>
    	</div>
    )
	}
}

export default Home