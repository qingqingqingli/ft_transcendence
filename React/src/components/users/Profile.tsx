import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import './stylesheets/Profile.css'
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({
        id: 0,
        username: '',
        avatar: '',
    });

    useEffect(() => {
       const getUser = async () => {
           const {data} = await axios.get('userData')
           setUser(data);
       }
        getUser();
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }

    return (
        <div className="container profilepage">
            <div className="row profile">
                <div className="col-md-12">
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <img src={`${user?.avatar}`} className="img-responsive" alt=""/>
                        </div>

                        <div className="profile-usertitle">
                            <div className="profile-usertitle-job">{user?.username}</div>
                        </div>

                        <div className="profile-userbuttons">
                            <button type="button" className="btn btn-success btn-sm">Game invite</button>
                            <Link to={`/update`} type="button" className="btn btn-success btn-sm">Update profile</Link>
                            <button type="button" className="btn btn-success btn-sm">Message</button>
                            <Link to="/" onClick={logout} type="button" className="btn btn-danger btn-sm">Log out</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="row profile-content">
                        <div className="col-md-1"></div>
                        <div className="col-md-4 box-info">
                            <div className="row">
                                <div className="col-md-12 title"><h3>PLAYER STATISTICS</h3></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>6</p></div>
                                <div className="col-md-10 desc"><p>Rank</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>2</p></div>
                                <div className="col-md-10 desc"><p>Wins</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>5</p></div>
                                <div className="col-md-10 desc"><p>Loses</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>7</p></div>
                                <div className="col-md-10 desc"><p>Games played</p></div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-4 ">
                            <div className="row">
                                <div className="col-md-12 title"><h3>MATCH HISTORY</h3></div>
                            </div>
                            <div className="row ranking">
                                <p>10 - player x vs player x - 8</p>
                                <p>10 - player x vs player x - 8</p>
                                <p>10 - player x vs player x - 8</p>
                                <p>10 - player x vs player x - 8</p>
                                <p>5 - player x vs player x - 10</p>
                                <p>5 - player x vs player x - 10</p>
                                <p>5 - player x vs player x - 10</p>
                                <p>3 - player x vs player x - 10</p>
                                <p>3 - player x vs player x - 10</p>
                                <p>3 - player x vs player x - 10</p>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile
