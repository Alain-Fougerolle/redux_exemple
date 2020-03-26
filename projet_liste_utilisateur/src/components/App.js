import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

// Typo et Css //
import 'typeface-roboto';
import "../assets/styles/App.scss";

// React Route //
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components //
import { Liste, Info, Modif, NotFound } from './pages';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: "http://127.0.0.1:8080",
            users : false,
            userSelec: false
        };

        this.socket = socketIOClient(this.state.endpoint);

        this.recupUser = this.recupUser.bind(this);
        this.miseAJourUsers = this.miseAJourUsers.bind(this);
    }

    recupUser(id) {
        const { users } = this.state;

        this.setState({
            userSelec: users[id-1]
        });
    }

    miseAJourUsers(objetModif) {
        const { users } = this.state;

        let newUsers = users;
        newUsers[objetModif.id-1] = objetModif; // -1 parque mySql commence a 1 

        this.setState({
            userSelec : objetModif,
            users : newUsers
        });
    }

	render() {
        const { users, userSelec } = this.state;

		return (
			<div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Liste 
                                users={users}
                                recupUser={this.recupUser}
                            />
                        </Route>
                        <Route path="/liste">
                            <Liste 
                                users={users}
                                recupUser={this.recupUser}
                            />
                        </Route>
                        <Route path="/info">
                            <Info
                                user={userSelec}
                            />
                        </Route>
                        <Route path="/modif">
                            <Modif 
                                user={userSelec}
                                socket={this.socket}
                                miseAJourUsers={this.miseAJourUsers}
                            />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
			</div>
		);
    }
    
    componentDidMount() {
        this.socket.emit("recupUsers");
        this.socket.on("Users", donner =>
            this.setState({
                users : donner
            })
        );
    }
}