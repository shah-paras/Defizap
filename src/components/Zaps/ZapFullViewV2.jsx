import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import autobind from 'react-autobind';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// import ReturnSparkLine from '../ReturnSparkline';
import PercentageCircle from '../PercentageCircle';
import BuyButtonContainer from '../BuyButton/BuyButtonContainer';
import Donut from '../PercentageDoughnut';
import '../../App.css';

class ZapFullView extends PureComponent {
  constructor(props) {
    console.log(props)

    super(props);
    this.state = {};
    autobind(this);
  }

  customToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey);
    return (
      <Button
        className="m-2"
        onClick={decoratedOnClick}
        variant="link"
        size="lg"
      >
        {children}
      </Button>
    );
  };

  render() {
    const {
      name,
      components,
      isOrderable,
      description,
      output,
      hasReturnsChart,
      oneClickAccessTo,
      platformsUsed,
      metamaskInteractionsSaved,
    } = this.props;

    return (
      <Card className="text-center text-capitalize">
        <Card.Body>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={4}>
              <Donut data={this.props} />
            </Col>
          </Row>
          <Card.Title>
            <div className="h1 bold">{name}</div>
          </Card.Title>

          <div className="mt-2">
            <BuyButtonContainer
              name={name}
              size="lg"
              isOrderable={isOrderable}
            />
            <Button
              href={description.tutorialLink}
              variant="outline-primary"
              target="_blank"
              size="lg"
              className="m-2"
            >
              View Tutorial
                      </Button>
          </div>
          {oneClickAccessTo ?
            <span >
              <h6 className='zapFullViewHeader'> 1-Click Access To</h6>
              <h6>{oneClickAccessTo.map((access, index) => <Badge variant='primary' className={index === 0 ? 'beforePill' : 'afterPill'} >{access.text}</Badge>)}</h6>
            </span> : ''}


          {platformsUsed ?
            <span>
              <h6>Platforms Used</h6>
              <h6>{platformsUsed.map((platform, index) => <Badge variant='success' className={index === 0 ? 'beforePill' : 'afterPill'} >{platform.value}</Badge>)}</h6>
            </span> : ''}

          <h6>Input</h6>
          {/* NEEDS TO BE MODIFIED FOR AN ARRAY */}
          <span>
            <Badge variant='dark' className='beforePill' >ETH</Badge>
          </span>


          <Card.Subtitle className="text-muted text-light">
            {output}
          </Card.Subtitle>

        </Card.Body>
        <Card.Body>
          <h6>Output</h6>

          <Row style={{ paddingTop: 0 }} className="justify-content-center">
            {components.map(item => (
              <div key={item.name}>
                <PercentageCircle
                  percentage={item.percent}
                  color={item.color}
                />
                <h6 className="text-center mt-3">{item.name}</h6>
              </div>
            ))}
          </Row>

          {metamaskInteractionsSaved ?
            <span>
              <h6 className='zapFullViewHeader'>Metamask Interactions Saved</h6>
              <p>{metamaskInteractionsSaved.map(interactions => interactions.saved)}</p>
            </span> : ''}

          {this.props.whatThisMeans ?
            <span>
              <h6>What this means</h6>
              <p>{this.props.whatThisMeans.text}</p>
            </span> : ''}



        </Card.Body>
      </Card>
    );
  }
}

export default ZapFullView;
