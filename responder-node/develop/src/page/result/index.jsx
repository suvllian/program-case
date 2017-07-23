import React, {Component} from 'react'
import { Table, Button } from 'antd'
import { Link } from 'react-router'
import store from './../../utils/store.js'
import userColumns from './config/user-columns.js'
import './index.scss'

class userList extends Component {
	constructor(props) {
		super(props);
		
    this.socket = io()
		this.state = {
			userList: []
		}
    this.getData = this.getData.bind(this)
	}

  componentDidMount() {

    // 每次进入结果页面，添加监听事件，该事件只用触发一次
    this.socket.once('getInitData', (obj) => {
      this.setState({ userList: obj.data })
    })

    // 获取初始化数据
    this.socket.emit('getInitData')

    // 监听数据变化
    this.socket.on('getData', this.getData)

    // 服务器端触发重置事件，按钮重置
    this.socket.on('reset', this.resetBtn)
  }

  componentWillUnmount() {

    // 组件卸载，移除监听事件
    this.socket.removeListener('getData', this.getData)
    this.socket.removeListener('reset', this.resetBtn)
  }

  getData(obj) {
    this.setState({ userList: obj.data })
  }

  resetBtn() {
    store.remove("isAnswer")
  }

  renderBackBtn () {
    if (store.get("userNumber") === 'baiji' && store.get("userName") === 'baiji') {
      return (
        <Link to="/reset" className="result-btn">
          <Button type="primary">返回主页</Button>
        </Link>
      )
    } else {
      return (
        <Link to="/home" className="result-btn">
          <Button type="primary">返回主页</Button>
        </Link>
      )
    }
  }

	render() {
    const { userList} = this.state

    userList.map((item, index) => {
      item.index = index + 1
    })

    return (
    	<div className="result-page">
    		<Table 
          dataSource={userList}
          columns={userColumns}
          pagination={false}  
          className="result-table" 
    		/>
        {this.renderBackBtn()}
    	</div>
    )
	}
}

export default userList