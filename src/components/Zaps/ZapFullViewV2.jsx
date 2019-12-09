import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import autobind from 'react-autobind';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// import ReturnSparkLine from '../ReturnSparkline';
import PercentageCircle from '../PercentageCircle';
import BuyButtonContainer from '../BuyButton/BuyButtonContainer';
import Donut from '../PercentageDoughnut';
import '../../App.css';

class ZapFullView extends PureComponent {
  constructor(props) {
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
      hasReturnsChart
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
          <Card.Subtitle className="text-muted text-light">
            {output}
          </Card.Subtitle>
          <div className="mt-2">
            <BuyButtonContainer
              name={name}
              size="lg"
              isOrderable={isOrderable}
            />
          </div>
        </Card.Body>
        <Card.Body>
          <Row className="justify-content-center">
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
        </Card.Body>
      </Card>
    );
  }
}

export default ZapFullView;
