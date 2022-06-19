import Header from "./components/Header";
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Main from "./pages/Main";
import User from "./pages/User";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import Gotop from "./components/Gotop";
function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Gotop />
      <Routes>
        <Route exact path="/" element={ <Main /> }></Route>
        <Route exact path="/:id" element={ <Post /> }></Route>
        <Route path="/user" element={ <User /> }></Route>
        <Route path="/signin" element={ <Login /> }></Route>
        <Route path="/newpost" element={ <NewPost /> }></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
