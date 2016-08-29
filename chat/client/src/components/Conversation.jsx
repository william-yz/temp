import React, { Component, PropTypes } from 'react'

import {Row, Col, Input} from 'antd'

import styles from './Conversation.less'
class Conversation extends Component {

  componentWillReceiveProps(newProps) {
    const div = this.refs.conversation
    div.scrollTop = div.scrollHeight
  }
  render() {
    return (
      <div className={styles.conversation} ref="conversation">
        {this.props.conversations.map((conversation, index) => {
          return (<Row key={index} type="flex" align="top">
              <Col span={3}><div className={styles.myname}>{conversation.name}</div></Col>
              <Col span={18}><div className={styles.content}>{conversation.content}</div></Col>
              <Col span={3}><div className={styles.time}>{conversation.time}</div></Col>
            </Row>)
        })}
      </div>

    )
  }
}

export default Conversation
