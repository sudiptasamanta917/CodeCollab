import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/LoginAndSignUp/SignUp';
import { Login } from './components/LoginAndSignUp/Login';
import { Groups } from './components/Groups/Groups';
import { GroupDetails } from './components/GroupDetails/GroupDetails';
// import {CodeEditor} from './components/CodeEditor';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <h1>CodeEditor</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users/:userId/groups" element={<Groups />} />
          <Route path='/groups/:groupId' element = {<GroupDetails />} />
          {/* <Route path='/codeEditor' element = {<CodeEditor />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
