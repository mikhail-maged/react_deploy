import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './Routing/Login';
import Register from './Routing/Register';
import Home from './Routing/Home';
import Profile from './Routing/Profile';
import Follower from './Routing/Follower';
import Following from './Routing/Following';
import Likes from './Routing/Likes';
import Replies from './Routing/Replies'
import EditProfile from './Routing/EditProfile';
import Explore from './Routing/Explore';
import Logout from './Routing/Logout';
import Messages from './Routing/Messages';
import MessageExplore from './Components/MessageExplore';
import ParticularTweet from './Routing/PaticularTweet';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/home"} component={Home} />

        <Route exact path={"/profile"} component={EditProfile} />
        <Route exact path={"/explore"} component={Explore} />
        <Route exact path={"/logout"} component={Logout} />

        <Route exact path={"/tweet/:id"} component={ParticularTweet} />
        <Route exact path={"/message"} component={MessageExplore} />
        <Route exact path={"/message/:username"} component={Messages} />

        <Route exact path={"/:username/followers"} component={Follower} />
        <Route exact path={"/:username/following"} component={Following} />
        <Route exact path={"/:username"} component={Profile} />
        <Route exact path={"/:username/likes"} component={Likes} />
        <Route exact path={"/:username/replies"} component={Replies} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
