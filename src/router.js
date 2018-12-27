import React from 'react';
import { Router, Route, Switch, Link  } from 'dva/router';
import { Menu } from 'antd'
import ReceiveNotices from './routes/notice/ReceiveNotices'
import Home from './routes/Home'
import Lottery from './routes/lottery'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

function RouterConfig({ history }) {
  let defaultSelectedKey = 'home'
  let defaultOpenKey = 'notice'
  const path = history.location.pathname
  if (path.length > 1) {
    const defaultSelectedKeys = path.slice(1).split('/')
    defaultSelectedKey = defaultSelectedKeys.join('-')
    defaultOpenKey = defaultSelectedKeys[0]
  }
  return (
    <Router history={history}>
      <div className="container">
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={[defaultSelectedKey]}
          defaultOpenKeys={[defaultOpenKey]}
          mode="inline">
          <SubMenu key="notice" title={<span>模拟公告</span>}>
            <MenuItem key="home"><Link to='/'><div className='menuItem'>主页</div></Link></MenuItem>
            <MenuItem key="notice-receiveList"><Link to='/notice/receiveList'><div className='menuItem'>接收列表</div></Link></MenuItem>
          </SubMenu>
          <SubMenu key="component" title={<span>组件</span>}>
            <MenuItem key="component-lottery"><Link to='/component/lottery'><div className='menuItem'>抽奖</div></Link></MenuItem>
            <MenuItem key="6">Option 6</MenuItem>
          </SubMenu>
        </Menu>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/notice/receiveList" component={ReceiveNotices} />
          <Route path="/component/lottery" component={Lottery} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
