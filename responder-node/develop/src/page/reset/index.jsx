import React, {Component} from 'react'
import { Button, message } from 'antd'
import { Link, hashHistory } from 'react-router'
import store from './../../utils/store.js'

import loginBg from './../../assets/login_bg.png'

const bgStyle = {
  backgroundImage: `url(${loginBg})`
}

class Home extends Component {
	constructor(props) {
		super(props)

    this.socket = io()
    this.resetStore = this.resetStore.bind(this)
	}

  componentDidMount() {
    this.userNumber = store.get("userNumber")
    this.userName = store.get("userName")

    // 相关信息不存在，进入登录页面
    if (this.userNumber !== 'baiji' || this.userName !== 'baiji') {
      hashHistory.push("/login")
    }  
  }

  resetStore() {
    
    // 触发服务器清除缓存事件
    this.socket.emit('reset')
    message.info('清除成功')
  }

	render() {
    
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
          <Button type="primary" onClick={this.resetStore}>开始</Button>
        </div>

        <Link to="/result" className="result-btn">
          <Button type="primary">查看结果</Button>
        </Link>
    	</div>
    )
	}
}

export default Home