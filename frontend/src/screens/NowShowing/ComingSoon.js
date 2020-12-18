import React from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import Controls from '../../components/controls/Control';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
const theme = {
    root: {
        width: '100%',
        height: '100%',
        //  position: 'absolute',
        paddingTop: '2.5rem',
    },

    rows: {
        backgroundColor: '#555555',
        width: '100%',
        marginTop: '10px',
        padding: '5px',
        borderBottom: 'solid 1px',
        opacity: '0.9',
    },

    cols: {
        marginTop: '0px',
        marginBottom: '20px',
        color: 'black',
        padding: '2px',
        textAlign: 'center',
        height: '270px',
        paddingLeft: '4rem',
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
        marginTop: '0.5rem',
        marginLeft: '1rem',
        width: '200px',
        height: '270px',
    },
};
function ComingSoon() {
    const movieComing = useSelector((state) => state.movieComing);
    const { loading, moviesComing } = movieComing;
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
                    COMING SOON{' '}
                </h1>

                <Row style={theme.rows}>
                    {moviesComing.map((movie) => (
                        <Row style={theme.row} key={movie._id}>
                            <Image
                                src={movie.poster}
                                style={theme.poster}
                            ></Image>

                            <Col style={theme.cols}>
                                <h1> {movie.movieTitle} </h1>
                                <p>
                                    Director: {movie.director} Cast:
                                    {movie.mainCast}
                                </p>
                            </Col>
                        </Row>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ComingSoon;
