// 입구 파일: npm start 입력 시 해당 파일에 입력한 코드대로 실행함!
// 여러 가지 전역적인 설정이 들어가 있음!

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// ./ -> 현재 디렉토리를 의미함!
// .js 확장자가 생략되어있음!
import App from './App';
import reportWebVitals from './reportWebVitals';

// getElementById('root') ->
// 퍼블릭 폴더에 있는 index.html을 따라가보면 root가 id로 정의된 부분 존재
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 해당 코드가 UI의 전체! */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
