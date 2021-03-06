import React from 'react';
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <>
            <header>
                <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand>
                                <Image
                                    src='/images/logo.png'
                                    style={{ width: 200, height: 'auto' }}
                                    rounded
                                />
                            </Navbar.Brand>
                        </LinkContainer>

                        <LinkContainer to='/HomeScreen'>
                            <Nav.Link>
                                <span
                                    style={{ color: 'white', fontSize: '15px' }}
                                >
                                    HOME
                                </span>
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/NowShowing'>
                            <Nav.Link>
                                <span
                                    style={{ color: 'white', fontSize: '15px' }}
                                >
                                    NOW SHOWING
                                </span>
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/ComingSoon'>
                            <Nav.Link>
                                <span
                                    style={{ color: 'white', fontSize: '15px' }}
                                >
                                    COMING SOON
                                </span>
                            </Nav.Link>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav
                                className='ml-auto'
                                style={{ fontSize: '14px' }}
                            >
                                {userInfo ? (
                                    <NavDropdown
                                        title={userInfo.fullName}
                                        id='username'
                                    >
                                        <div
                                            style={{
                                                borderBottom: 'solid .1px',
                                            }}
                                        >
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>
                                                    Profile
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </NavDropdown.Item>
                                        </div>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> Sign
                                            In
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;
