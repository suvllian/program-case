import React, {Component} from 'react'
import { Table, Button } from 'antd'
import { Link } from 'react-router'
import api from './../../api/'
import userColumns from './config/user-columns.js'

class userList extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			userList: [],
      isFetching: false,
      userCount: 0
		}
	}
  
  componentDidMount() {
  	this.getUsers()
    this.getDataInterval()
  }

  componentWillUnmount() {
    clearInterval(this.handle)
  }

  getDataInterval() {
    this.handle = setInterval(() => this.getUsers(), 4000)
  }

  getUsers(page = 1) {
    this.setState({
      isFetching: true
    })

    api.getUsersData(1)
    .then(res => {
      this.setState({
        isFetching: false,
        userList: res.data,
        userCount: res.count
      })
    })
  }

	render() {
    const { isFetching = false, userList, userCount} = this.state

    userList.map((item, index) => {
      item.index = index + 1
    })

    return (
    	<div className="result-table">
    		<Table dataSource={userList} loading={isFetching}
          columns={userColumns} pagination={false} />
        <Link to="/home" className="result-btn">
          <Button type="primary">返回主页</Button>
        </Link>
    	</div>
    )
	}
}

export default userList