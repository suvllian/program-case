import React, {Component} from 'react'
import { Button, message } from 'antd'
import { Link, hashHistory } from 'react-router'
import store from './../../utils/store.js'
import api from './../../api/'
import loginBg from './../../assets/login_bg.png'

const bgStyle = { backgroundImage: `url(${loginBg})` }

class Home extends Component {
	constructor(props) {
		super(props)

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
    api.resetStore()
    message.info('清除成功')
  }

	render() { 
    return (
    	<div className="home" style={bgStyle}>
        <div className="answer-btn">
          <Button type="primary" onClick={this.resetStore}>重置</Button>
        </div>
        <Link to="/result" className="result-btn">
          <Button type="primary">查看结果</Button>
        </Link>
    	</div>
    )
	}
}

export default Home