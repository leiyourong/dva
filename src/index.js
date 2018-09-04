import dva from 'dva'
import model from './models/index'
// import createLogger from 'redux-logger'
import './index.css'

// 1. Initialize
const app = dva()

// 2. Plugins
// app.use({});

// 3. Model
model(app)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
