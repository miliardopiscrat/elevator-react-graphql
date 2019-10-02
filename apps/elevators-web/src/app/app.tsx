import React, { FC } from 'react';
import './app.less';
import Layout from 'antd/lib/layout';
import { ElevatorsMonitorContainer } from './components/elevators-monitor/elevators-monitor.container';
import { OperationPanelContainer } from './components/operation-panel/operation-panel.container';

const { Footer, Sider, Content } = Layout;

export const App: FC = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        overflow: 'auto'
      }}>
        <Layout>
          <Sider
            width={280} style={{ background: '#fff', paddingRight: '24px' }}>
            <OperationPanelContainer/>
          </Sider>
          <Content style={{
            background: '#fff',
            padding: 0,
            margin: 0,
            overflow: 'auto'
          }}>
            <div style={{ padding: 0, background: '#fff', textAlign: 'center' }}>
              <ElevatorsMonitorContainer data-testid="ElevatorsMonitorContainer"/>
              <br/>
            </div>
          </Content>

        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', height: '40px', padding: 0 }}>Elevator monitor ©2019</Footer>
    </Layout>
  );
};

export default App;
