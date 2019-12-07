import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
// import Navbar from 'react-bootstrap/Navbar';

import autobind from 'react-autobind';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Nav from 'react-bootstrap/Nav';

import PercentageCircle from '../PercentageCircle';
import LenderBuyButton from '../BuyButton/LenderBuyButton';
import '../../App.css';
import mkrUnipool from '../../assets/mkr-unipool.png';

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
    const { name, components, isOrderable, description, output } = this.props;

    return (
      <Card className="text-center text-capitalize">
        <Card.Body>
          <img src={mkrUnipool} width="10%" alt="Save Time" />
          <Card.Title>
            <div className="h1 bold">{name}</div>
          </Card.Title>
          <Card.Subtitle className="text-muted text-light">
            {output}
          </Card.Subtitle>
          <LenderBuyButton name={name} isOrderable={isOrderable} />
        </Card.Body>
        <Card.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="zapinfo">
            <Nav variant="tabs" className="flex-column">
              <Row>
                <Col>
                  <Nav.Link eventKey="zapinfo">Zap Info</Nav.Link>
                </Col>
                <Col>
                  <Nav.Link eventKey="returns">Returns</Nav.Link>
                </Col>
                <Col>
                  <Nav.Link eventKey="tutorial">Tutorial</Nav.Link>
                </Col>
              </Row>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="zapinfo">
                <Row className="justify-content-center">
                  {components.map(item => (
                    <div key={item.name}>
                      <PercentageCircle
                        percentage={item.percent}
                        color="#5540bf"
                      />
                      <h6 className="text-center mt-3">{item.name}</h6>
                    </div>
                  ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="returns">Returns</Tab.Pane>
              <Tab.Pane eventKey="tutorial">
                <Card.Body className="text-align- text-al">
                  <h3>{description.textQuestion}</h3>
                  {description.textAnswer.map(answer => {
                    return <p key={answer}>{answer}</p>;
                  })}
                  {description.textLink.map((linkData, i) => {
                    return (
                      <div key={linkData.hyperlink}>
                        <a
                          href={linkData.hyperlink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkData.text}
                        </a>{' '}
                        {i === description.textLink.length - 1 ? '' : 'and'}{' '}
                      </div>
                    );
                  })}
                </Card.Body>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    );
  }
}

export default ZapFullView;
