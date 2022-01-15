import React from 'react';
import axios from 'axios';

import './App.css';
import { Button, Card, Stack } from 'react-bootstrap';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

class App extends React.Component {
    state = { advice: '' };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip
                this.setState({ advice })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="app">
                <Card bg='info' className="col-lg-4 col-md-6 col-sm-8 col-10">
                    <Card.Header className="card-header">Quote machine</Card.Header>
                    <Card.Body>
                        <ReactCSSTransitionReplace transitionName="fade-wait"
                           transitionEnterTimeout={1000} transitionLeaveTimeout={400}>
                            <Card.Text key={this.state.advice} className="card-text mb-0 text-justify font-weight-normal">{this.state.advice}</Card.Text>
                        </ReactCSSTransitionReplace>
                    </Card.Body>
                    <Card.Footer>
                        <Stack className="justify-content-end" direction="horizontal" gap={1}>
                            <Button id="new-quote" variant="info" border="primary" onClick={this.fetchAdvice}>New quote</Button>
                            <Button id="tweet-quote" variant="info" href="https://www.twitter.com/intent/tweet">Tweet quote</Button>
                        </Stack>
                    </Card.Footer>
                </Card>
            </div>


        )
    }
}

export default App