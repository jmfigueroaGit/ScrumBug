import React, { useSelector } from 'react';
import { Button, Row, Col, Container, Image, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Controls from '../../components/controls/Control';
import Loader from '../../components/Loader';
const theme = {
    root: {
        width: '100%',
        marginTop: '2.5rem',
    },

    rows: {
        marginTop: '0px',
        padding: '5px',
    },

    cols: {
        marginTop: '0px',
        marginBottom: '20px',
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '2px',
        paddingBottom: '5px',
        marginLeft: '10px',
        textAlign: 'center',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
    },
    date: {
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    poster: {
        width: '210px',
        height: '270px',
    },
};
const NowShowingPreview = () => {
    // const movieList = useSelector((state) => state.movieList);
    // const { loading, error, moviesList } = movieList;
    return (
        <div>
            <Container style={theme.root}>
                <h1
                    style={{
                        fontSize: '25px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    {' '}
                    NOW SHOWING{' '}
                </h1>

                <Row style={theme.rows}>
                    <Col style={theme.cols}>
                        <Image
                            src='/images/PosterSample.png'
                            style={theme.poster}
                        />

                        <span style={theme.title}> </span>
                        <p style={theme.date}> Dec.1 ,2020 , Dec.31,2020</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NowShowingPreview;
