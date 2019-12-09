import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import autobind from 'react-autobind';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Nav from 'react-bootstrap/Nav';

import ReturnSparkLine from '../ReturnSparkline';
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
          <Tab.Container id="left-tabs-example" defaultActiveKey="zapinfo">
            <Nav variant="tabs" className="flex-column">
              <Row>
                <Col>
                  <Nav.Link eventKey="zapinfo">Zap Info</Nav.Link>
                </Col>
                {hasReturnsChart ? (
                  <Col>
                    <Nav.Link eventKey="returns">Returns</Nav.Link>
                  </Col>
                ) : null}
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
                        color={item.color}
                      />
                      <h6 className="text-center mt-3">{item.name}</h6>
                    </div>
                  ))}
                </Row>
              </Tab.Pane>
              {hasReturnsChart ? (
                <Tab.Pane eventKey="returns">
                  {
                    <ReturnSparkLine
                      exchange="0xe9cf7887b93150d4f2da7dfc6d502b216438f244"
                      periodTabValue="30"
                    />
                  }
                </Tab.Pane>
              ) : null}
              <Tab.Pane eventKey="tutorial">
                <Card.Body className="text-left">
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
