import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import QuestionScreen from './screens/QuestionScreen';
import ForgetPassword from './screens/ForgetPassword';
import Footer from './components/Footer';

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
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/question' component={QuestionScreen} />
                    <Route path='/ForgetPassword' component={ForgetPassword} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
