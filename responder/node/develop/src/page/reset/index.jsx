import React, {Component} from 'react'
import { Button, message } from 'antd'
import { Link, hashHistory } from 'react-router'
import getBtnRadius from './../../utils/getBtnRadius.js'
import store from './../../utils/store.js'

import loginBg from './../../assets/login_bg.png'

const bgStyle = {
  backgroundImage: `url(${loginBg})`
}

class Home extends Component {
	constructor(props) {
		super(props)

    this.state = {
      btnStyle: {
        height: 400,
        width: 400
      }
    }

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

    // 设置按钮宽度
    this.setBtnHeight()
  }

  setBtnHeight() {
    let radius = getBtnRadius()

    if (radius) {
      this.setState({
        btnStyle: {
          height: radius,
          width: radius
        }
      })
    }
  }

  resetStore() {
    
    // 触发服务器清除缓存事件
    this.socket.emit('reset')
    message.info('清除成功')
  }

	render() {
    const { btnStyle } = this.state

    return (
    	<div className="home-page" style={bgStyle}>
        <div className="home-header">
          <div className="header-logo"></div>

          <div className="header-png">
            <img src={require('./../../assets/login_bg.png')} />
          </div>
        </div>

        <div className="answer-btn" style={btnStyle}>
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