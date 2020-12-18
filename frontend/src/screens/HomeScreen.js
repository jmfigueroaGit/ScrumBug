import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Image } from 'react-bootstrap';
import NowShowingPreview from './NowShowing/NowShowingPreview';
import ComingSoon from '../screens/NowShowing/ComingSoon';
import {
    listComingSoon,
    listMovies,
    listNowShowing,
} from '../actions/movieAction';
const theme = {
    cover: {
        marginTop: '35px',
        width: '100%',
        height: '400px',
        opacity: '40%',
    },
    text: {
        color: 'white',
        fontsize: '15px',
        textAlign: 'center',
    },
    row: {
        textAlign: 'center',
    },
};
const HomeScreen = () => {
    const dispatch = useDispatch();
    dispatch(listMovies());
    dispatch(listNowShowing());
    dispatch(listComingSoon());
    return (
        <div>
            <Container>
                <Row style={theme.row}>
                    <Image src='/images/cover.png' style={theme.cover}></Image>
                </Row>

                <h1 style={theme.text}>
                    {' '}
                    SCRUMBUG CINEMA ONLINE TICKET RESERVATION
                </h1>
                <p
                    style={{
                        color: 'white',
                        fontSize: '20px',
                        textAlign: 'center',
                    }}
                >
                    Book your Movie Tickets Now!
                </p>

                {/* <Row>
                    <div>
                        <NowShowingPreview />
                    </div>
                </Row>
                <Row>
                    <div>
                        <ComingSoon />
                    </div>
                </Row> */}
            </Container>
        </div>
    );
};

export default HomeScreen;
