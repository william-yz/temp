import React, { Component, PropTypes } from 'react';
import {Tabs} from 'antd'


import ChatPanel from './ChatPanel'

require('./Content.css')

const TabPane = Tabs.TabPane;

class Content extends React.Component {
  static defaultProps = {
    activeChats : [{name : 'William', id: '1'},{name : 'Mace', id: '2'}]
  };

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeChats[0].id,
      activeChats: props.activeChats
    }
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.activeChats.forEach((pane, i) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    const activeChats = this.state.activeChats.filter(pane => pane.id !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = activeChats[lastIndex].id;
    }
    this.setState({ activeChats:activeChats, activeKey: targetKey});
  }

  render() {
    return (
      <div id="content">
        <div className='card-container'>
          <Tabs
            hideAdd
            defaultActiveKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit.bind(this)}
            onChange={activeKey => this.setState({activeKey})}
          >
            {this.state.activeChats.map(activeChat => {
              return (
                <TabPane
                  tab={activeChat.name}
                  key={activeChat.id}
                >
                  <ChatPanel name={activeChat.name}/>
                </TabPane>)
            })}

          </Tabs>
        </div>
      </div>
  )}
}

export default Content
