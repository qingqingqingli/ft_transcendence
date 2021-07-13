import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import LoginTwoFactor from "./components/users/LoginTwoFactor";
import UpdateUser from "./components/users/Update";
import ChatPage from "./pages/ChatPage";
import GamePage from "./components/game/GamePage";
import SpecialGame from "./components/game/SpecialGamePage";
import enableTwoFactor from "./components/users/EnableTwoFactor";
import RenderCreateChannel from "./components/chat/CreateChannel/RenderCreateChannel";
import PlayGame from "./components/game/PlayGame";
import WatchGame from "./components/game/WatchGame";
import WaitingRoom from "./components/game/WaitingRoom";

function App() {
  return (
        <BrowserRouter>
          <main>

              <Route exact path={'/'} component={Login} />

              <Route exact path={'/enableTwoFactor'} component={enableTwoFactor}  />

              <Route exact path={'/twoFactor'} component={LoginTwoFactor}  />

              <Route exact path={'/register'} component={Register} />

              <Route exact path={"/createChannel"}><RenderCreateChannel /></Route>

              <Route exact path={'/profile'} component={Profile}  />

              <Route exact path={'/update'} component={UpdateUser}  />

              <Route exact path={"/chat"}><ChatPage /></Route>

              <Route exact path={'/PlayGame'} component={PlayGame}  />

              <Route exact path={'/WatchGame'} component={WatchGame}  />

              <Route exact path={'/WaitingRoom'} component={WaitingRoom}  />

              <Route exact path={'/game:gameID'} component={GamePage}  />

              <Route exact path={'/specialGame'} component={SpecialGame}  />

          </main>
        </BrowserRouter>
  );
}

export default App;
