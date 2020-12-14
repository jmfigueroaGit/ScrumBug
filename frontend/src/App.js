/* eslint-disable no-unused-vars */
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import EmailAuth from './screens/ForgetPasswordScreen/AccountSetup';
import Authentication1 from './screens/ForgetPasswordScreen/Authentication_1';
import Authentication2 from './screens/ForgetPasswordScreen/Authentication_2';
import Authentication3 from './screens/ForgetPasswordScreen/Authentication_3';
import ResetPassword from './screens/ForgetPasswordScreen/ChangePassword';
import Footer from './components/Footer';
import Form from './screens/RegisterScreen/Form';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main
                style={{
                    backgroundImage: `linear-gradient(to top, transparent 1%,transparent 0%,black 95%,black 100%), url("images/bg.gif")`,
                    width: '100%',
                    height: '100vh',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={Form} />

                    <Route path='/forgotPassword' component={EmailAuth} />
                    <Route
                        path='/authentication-1'
                        component={Authentication1}
                    />
                    <Route
                        path='/authentication-2'
                        component={Authentication2}
                    />
                    <Route
                        path='/authentication-3'
                        component={Authentication3}
                    />
                    <Route path='/resetPassword' component={ResetPassword} />

                    <Route path='/home' component={HomeScreen} exact />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route
                        path='/admin/user/:id/edit'
                        component={UserEditScreen}
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
