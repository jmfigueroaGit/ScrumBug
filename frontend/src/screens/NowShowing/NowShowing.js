import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import {
    listComingSoon,
    listMovies,
    listNowShowing,
} from '../../actions/movieAction';
import Controls from '../../components/controls/Control';
const theme = {
    root: {
        width: '100%',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        height: '100%',
    },

    cols: {
        width: '20%',
        marginTop: '0px',
        color: 'black',
        padding: '2px',
        paddingLeft: '20px',
        paddingBottom: '5px',
        marginLeft: '10px',
    },
    title: {
        fontSize: '25px',
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
    row: {
        backgroundColor: '#555555',
        width: '100%',
        marginTop: '10px',
        padding: '5px',
    },
};
const NowShowing = () => {
    
   

    const movieNow = useSelector((state) => state.movieNow);
    const { loading, moviesNow } = movieNow;
    console.log(moviesNow);
    return (
        <div>
            <Container style={theme.root}>
                <h1 style={theme.title}>NOW SHOWING</h1>
                {moviesNow.map((movie) => (
                    <Row style={theme.row} key={movie._id}>
                        <Image src={movie.poster} style={theme.poster}></Image>

                        <Col style={theme.cols}>
                            <h1> {movie.movieTitle} </h1>
                            <p>
                                Director: {movie.director} Cast:
                                {movie.mainCast}
                            </p>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default NowShowing;
