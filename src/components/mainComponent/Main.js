import Container from "react-bootstrap/Container";
import React, { Component } from "react";
import { NavBar } from "../../components/NavBar";
import { HomeContainer } from "../../components/HomeContainer"; 
import { UserAgentApplication } from "msal";

import {
  BrowserRouter as Router,
  Route,
  NavLink as RouterNavLink,
} from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Jumbotron,
} from "reactstrap";
import { config } from "../configComponent/Config";
import ErrorMessage from "../ErrorComponent/ErrorMessage";
import { normalizeError, getUserProfile } from "../../components/utils/MSUtils";

//import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap/dist/css/bootstrap.css";
import '../../../src/components/css/popup.css'
class Main extends Component {
  constructor(props) {
    const { storageType, useCookie } = config.cache;

    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      error: null,
      isAuthenticated: false,
      user: {},
    };

    this.userAgentApplication = new UserAgentApplication({
      auth: {
        //authority:config.authority,
        clientId: config.clientId,
        redirectUri: config.redirectUri,
      },
      cache: {
        cacheLocation: storageType,
        storeAuthStateInCookie: useCookie,
      },
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      
    });
  }
  async login() {
    try {
      await this.userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
    
      const user = await getUserProfile(
        this.userAgentApplication,
        config.scopes
      );
      this.setState({
        
        isAuthenticated: true,
        user: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true,
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
        },
        
        error: null,
      });
      
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: normalizeError(err),
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = (
        <ErrorMessage
          message={this.state.error.message}
          debug={this.state.error.debug}
        />
      );
    }
    return (
      <div>
        <Router>
          <div>
            <Navbar color="white" dark expand="md" fixed="top"   className="bordert-b">
              <Container>
                <NavbarBrand className="fontColorchange"><img
          alt=''
          src='/images/sub_logo.jpg'
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        Children's Internal Review Panel (ChIRP)</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <RouterNavLink
                        to="/"
                        className="nav-link float-right home"
                        exact
                      >
                        Home
                      </RouterNavLink>
                    
                    </NavItem>
                  </Nav>
                  <Nav className="justify-content-end" navbar>
                    {this.state.isAuthenticated ? (

                      <UncontrolledDropdown>
                        <DropdownToggle nav caret>
                          <i
                            className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
                            style={{ width: "32px" }}
                          ></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <h5 className="dropdown-item-text mb-0">
                            {this.state.user.displayName}
                          </h5>
                          <p className="dropdown-item-text text-muted mb-0">
                            {this.state.user.email}
                          </p>
                          <DropdownItem divider />
                          <DropdownItem
                            className="float-right"
                            onClick={() =>
                              this.state.isAuthenticated
                                ? this.logout()
                                : this.login()
                            }
                          >
                            Sign Out
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) : (
                      <NavItem>
                        <Button
                          onClick={() => this.login()}
                          className="btn-link nav-link border-0 home"
                          color="link"
                        >
                            Sign In
                        </Button>
                             
                        </NavItem>
                       
                    )}
                   
                  </Nav>
                </Collapse>
  
              </Container>
            </Navbar>
            <Container>
              <Route
                exact
                path="/"
                render={() => (
                  <Jumbotron>
                     
                    <p className="lead">{error}</p>

                    {this.state.isAuthenticated ? (
                      <div>
                      

                      
                          <NavBar />{" "}
                         
                        <Container>
                          <HomeContainer />
                        </Container>
                      </div>
                    ):""}
                  </Jumbotron>
                )}
              />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
