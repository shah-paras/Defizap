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
    super(props);
    this.state = {};
    autobind(this);
  }

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
      metamaskInteractionsSaved
    } = this.props;

    return (
      <Card>
        <Card.Body className="text-center">
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
        </Card.Body>
        <Card.Body>
          <Row>
            <Col xs={12} md={6}>
              {oneClickAccessTo ? (
                <span>
                  <h5 className="zapFullViewHeader"> 1-Click Access To</h5>
                  <h5>
                    {oneClickAccessTo.map((access, index) => (
                      <Badge
                        key={access.text}
                        variant="primary"
                        className={index === 0 ? 'beforePill' : 'afterPill'}
                      >
                        {access.text}
                      </Badge>
                    ))}
                  </h5>
                </span>
              ) : (
                ''
              )}
              {platformsUsed ? (
                <span>
                  <h5>Platforms Used</h5>
                  <h5>
                    {platformsUsed.map((platform, index) => (
                      <a
                        href={platform.url}
                        key={platform.value}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Badge
                          variant="success"
                          className={index === 0 ? 'beforePill' : 'afterPill'}
                        >
                          {platform.value}
                        </Badge>
                      </a>
                    ))}
                  </h5>
                </span>
              ) : (
                ''
              )}
              {metamaskInteractionsSaved ? (
                <span>
                  <h5 className="zapFullViewHeader">
                    Metamask Interactions Saved
                  </h5>
                  <p>
                    {metamaskInteractionsSaved.map(
                      interactions => interactions.saved
                    )}
                  </p>
                </span>
              ) : (
                ''
              )}
              <span>
                <h5>
                  Input Tokens:{' '}
                  <Badge variant="dark" className="beforePill">
                    ETH
                  </Badge>
                </h5>
              </span>
            </Col>
            <Col xs={12} md={6}>
              <h5>Output Tokens: </h5>
              <br />
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
              {/* </Col>
            <Col xs={12} md={6}> */}
              {this.props.whatThisMeans ? (
                <span>
                  <h5>What this means</h5>
                  <p>{this.props.whatThisMeans.text}</p>
                </span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ZapFullView;
