import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

import Home from './pages/Home';
import BugForm from './pages/BugForm';
import BugUpdate from './pages/BugUpdate';
import BugList from './pages/BugList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Comment from './pages/Comment';
import CommentList from './pages/CommentList';
import DevAndTester from './pages/DevAndTester';
import Help from './pages/Help';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />

        <Route path="/" element={<SignUp />} />

        <Route path="/help" element={<Help />} />

        <Route path="/dashboard" element={<Home />} />

        <Route path="/bugreport" element={<BugForm />} />

        <Route path="/bugList" element={<BugList />} />

        <Route path="/bugUpdate/:id" element={<BugUpdate />} />

        <Route path="/createComment" element={<Comment />} />

        <Route path="/employees" element={<DevAndTester />} />

        <Route path="/commentList" element={<CommentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
