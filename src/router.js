import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';
import { Menu } from 'antd'
import IndexPage from './routes/IndexPage'
import ReceiveNotices from './routes/notice/ReceiveNotices'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className="container">
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['weibo-receivelist']}
          defaultOpenKeys={['weibo']}
          mode="inline">
          <SubMenu key="weibo" title={<span>Notice</span>}>
            <MenuItem key="home"><Link to='/home'><div className='menuItem'>主页</div></Link></MenuItem>
            <MenuItem key="weibo-receivelist"><Link to='/notice/receiveList'><div className='menuItem'>接收列表</div></Link></MenuItem>
          </SubMenu>
          <SubMenu key="sub2" title={<span>Component</span>}>
            <MenuItem key="5">Option 5</MenuItem>
            <MenuItem key="6">Option 6</MenuItem>
          </SubMenu>
        </Menu>
        <Switch>
          <Route path="/home" exact component={IndexPage} />
          <Route path="/notice/receiveList" exact component={ReceiveNotices} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
