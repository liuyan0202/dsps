import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './app.jsx';
import '@/assets/font/iconfont.css'
import { Provider } from 'react-redux'
import store from '@/store/store'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));