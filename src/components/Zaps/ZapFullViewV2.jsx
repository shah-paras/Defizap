import React, { PureComponent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import autobind from 'react-autobind';

// import ReturnSparkLine from '../ReturnSparkline';
// import PercentageCircle from '../PercentageCircle';
import BuyButtonContainer from '../BuyButton/BuyButtonContainer';
import GiftButton from '../GiftButton';
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
      description,
      hasReturnsChart,
      oneClickAccessTo,
      platformsUsed,
      metamaskInteractionsSaved,
      ensAddress,
      gasLimitRequirement,
      tokenAddress
    } = this.props;

    return (
      <Card>
        <Card.Body className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={4}>
              <Donut data={this.props} />
            </Col>
          </Row>
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs={12} sm={4}>
              <BuyButtonContainer {...this.props} size="lg" />
            </Col>
            <Col xs={12} sm={4} className="justify-content-start">
              <GiftButton {...this.props} />
            </Col>
          </Row>
          <Row className="justify-content-center align-text-center">
            <Col xs={12} md={6} className="justify-content-center text-center">
              {oneClickAccessTo ? (
                <span>
                  <h5 className="zapFullViewHeader">1-click access to:</h5>
                  <h5>
                    {oneClickAccessTo.map((access, index) => (
                      <Row key={access.text} className="justify-content-center">
                        <Badge
                          key={access.text}
                          style={{ backgroundColor: access.color }}
                          variant="primary"
                          className={index === 0 ? 'beforePill' : 'afterPill'}
                        >
                          {access.text}
                        </Badge>
                      </Row>
                    ))}
                  </h5>
                </span>
              ) : null}
              {this.props.whatThisMeans ? (
                <span>
                  <h5>What this means:</h5>
                  <ul>
                    {this.props.whatThisMeans.text.map(item => (
                      <li key={item} className="text-left">
                        {item}
                      </li>
                    ))}
                  </ul>
                </span>
              ) : null}
              <a
                href={description.tutorialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="my-1"
              >
                <h5>View Detailed Tutorial</h5>
              </a>
              {platformsUsed ? (
                <span>
                  <h5>Platforms used: </h5>
                  <h5>
                    {platformsUsed.map((platform, index) => (
                      <a
                        href={platform.url}
                        key={platform.value}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Badge
                          style={{ backgroundColor: platform.color }}
                          variant="success"
                          className={index === 0 ? 'beforePill' : 'afterPill'}
                        >
                          {platform.value}
                        </Badge>
                      </a>
                    ))}
                  </h5>
                </span>
              ) : null}
              {metamaskInteractionsSaved ? (
                <span>
                  <h5>Wallet interactions saved:</h5>
                  <h1>
                    {metamaskInteractionsSaved.map(
                      interactions => interactions.saved
                    )}
                  </h1>
                </span>
              ) : null}
              {ensAddress ? (
                <span>
                  <h5>View contract on Etherscan:</h5>
                  <h5>
                    <a
                      href={`https://etherscan.io/address/${ensAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Badge variant="info">{ensAddress}</Badge>
                    </a>
                  </h5>
                  <p style={{ fontSize: '0.75em' }}>
                    Alternatively send ETH directly to this address using
                    <i> minimum </i>
                    {gasLimitRequirement} gas.
                  </p>
                </span>
              ) : null}
              <div className="mt-2">
                {hasReturnsChart ? (
                  <a
                    href={`https://pools.fyi/#/returns/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="my-1"
                  >
                    <h5>View Returns on Pools.fyi</h5>
                  </a>
                ) : null}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ZapFullView;
