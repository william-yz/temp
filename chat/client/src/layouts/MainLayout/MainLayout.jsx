import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import {Row, Col} from 'antd'
import styles from './MainLayout.less';

import Header from '../Header'
import Nav from '../Nav'
import Content from '../../components/Content'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col span={6}>
          <Nav />
        </Col>
        <Col span={12}>
          <Content />
        </Col>
      </Row>
    </div>
  );
};
//
// MainLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default MainLayout;
