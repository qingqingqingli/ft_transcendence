import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import "./RenderCreateChannel.css";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import logo from "./img/42_logo.svg";
import API from "../../../API/API";

function RenderCreateChannel() {
  // states for data types
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [Password, setPassword] = useState("");
  // states for data transfer
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [channelAdmins, setChannelAdmins] = useState<Array<User>>([]);
  const [invalid, setInvalid] = useState(false);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("users");
      setUsers(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    const setActiveID = async () => {
      const { data } = await API.User.getActiveUserID();
      setActiveUserID(data.activeUserID);
    };

    const getUser = async () => {
      const { data } = await API.User.findName(ActiveUserID);
      if (data) {
        setChannelAdmins([data]);
        setChannelUsers([data]);
      }
    };
    setActiveID();
    getUser();
  }, [ActiveUserID]);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("channels", {
      Name: channelName,
      IsPrivate: isPrivate,
      Users: channelUsers,
      Admins: channelAdmins,
      Password: Password,
    });
    setRedirect(true);
  };

  function renderChannelName() {
    return (
      <div className="form-floating">
        <input
          required
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <label htmlFor="floatingInput">ChannelName</label>
      </div>
    );
  }

  function renderChooseUsers() {
    function OnSelectUser(selectedList: any) {
      setChannelUsers(selectedList);
      if (selectedList.length < 2) setInvalid(true);
      else setInvalid(false);
    }
    return (
      <div>
        <Multiselect
          options={users}
          selectedValues={channelUsers}
          displayValue="username"
          placeholder="Choose Users"
          onSelect={OnSelectUser}
        />
      </div>
    );
  }

  function renderChooseAdmin() {
    function OnSelectAdmin(selectedList: any) {
      setChannelAdmins(selectedList);
    }

    return (
      <div>
        <Multiselect
          options={users}
          selectedValues={channelAdmins}
          displayValue="username"
          placeholder="Choose Additional Admins"
          onSelect={OnSelectAdmin}
        />
      </div>
    );
  }

  function renderIsPrivate() {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="defaultCheck1"
          onChange={() => setIsPrivate(true)}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          Private
        </label>
      </div>
    );
  }

  function renderPassword() {
    if (isPrivate) {
      return (
        <div className="form-floating">
          <input
            required
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
      );
    } else return;
  }

  function renderChannelCreation() {
    return (
      <div>
        {renderChannelName()}
        {renderChooseAdmin()}
        {renderChooseUsers()}
        {renderIsPrivate()}
        {renderPassword()}
      </div>
    );
  }
  if (redirect && !invalid) return <Redirect to={"/chat"} />;
  else {
    return (
      <main className="Register_component">
        <form onSubmit={submit}>
          <img
            className="mb-4"
            src={logo}
            alt="42_logo"
            width="72"
            height="57"
          />
          {invalid ? (
            <p className="participantSubTitle">
              Choose more than 1 participant
            </p>
          ) : (
            <p />
          )}
          <h1 className="h3 mb-3 fw-normal">Create new Channel</h1>
          {renderChannelCreation()}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  }
}

export default RenderCreateChannel;
