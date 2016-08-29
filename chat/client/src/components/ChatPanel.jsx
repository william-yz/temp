import React from 'react'
import { Tabs, Input } from 'antd';

import Conversation from './Conversation'
const TabPane = Tabs.TabPane;

class ChatPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputting: '',
      conversations: []
    }
  }

  onInput(e) {
    this.setState({inputting : e.target.value})
  }

  now() {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    return `${hour} : ${minutes < 10 ? ('0'+minutes) : minutes}`
  }

  onPressEnter(e) {
    e.preventDefault()
    const conversations = this.state.conversations
    let name = 'William'
    if (conversations.length > 1 && conversations[conversations.length - 1].name === 'William') {
      name = ''
    }
    conversations.push({
      name: name,
      content: this.state.inputting,
      time: this.now()
    })
    this.setState({
      conversations,
      inputting: ''
    })
  }

  render() {
    return (
      <div style={{height:'80%'}}>
        <Conversation conversations={this.state.conversations}/>
        <Input type="textarea" rows={4} value={this.state.inputting} onChange={this.onInput.bind(this)} onPressEnter={this.onPressEnter.bind(this)}/>
      </div>

    )
  }
}

export default ChatPanel
