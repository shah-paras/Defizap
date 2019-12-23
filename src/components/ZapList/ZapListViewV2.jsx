import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import '../../App.css';
import Donut from '../PercentageDoughnut';
import NavigationBar from '../NavigationBar';
import {
  INDIVIDUAL_ZAP_PAGE,
  GENERATE_ZAP
} from '../../constants/googleAnalytics';
import { registerEvent } from '../../api/googleAnalytics';
import BuyButtonContainer from '../BuyButton/BuyButtonContainer';
import GiftButton from '../GiftButton';

const footerButtons = () => (
  <div className="row justify-content-center my-1">
    <div className="col-12 col-md-12 col-lg-12 text-center">
      <Button variant="outline-info" size="lg" href="/survey" type="link" block>
        Not sure which to pick? Try Zap Generator
      </Button>
      <hr />
      <Button
        variant="outline-info"
        target="_blank"
        size="lg"
        href="https://defizap.typeform.com/to/UZSZg5"
        type="link"
        block
        onClick={() =>
          registerEvent({
            category: GENERATE_ZAP,
            action: INDIVIDUAL_ZAP_PAGE
          })}
      >
        Don&apos;t see your Zap? Submit a request and we will create one!
      </Button>
    </div>
  </div>
);

const Zap = props => {
  return (
    <Col xs={12} md={4} lg={3} key={props.name} className="m-4 bg-white">
      <Col className="align-text-center">
        <Donut data={props} />
      </Col>
      <Col>
        {props.isOrderable ? null : (
          <>
            <h4>This Zap is still under development.</h4>
            <h4>
              In the meantime, check out our available Zaps{' '}
              <a href="/zaps">here</a>.
            </h4>
          </>
        )}
        <Row className="text-center">
          <Col className="text-sm-center">
            {props.oneClickAccessTo ? (
              <span>
                <h6>1-click access to:</h6>
                <h6>
                  {props.oneClickAccessTo.map((access, index) => (
                    <Row key={access.text} className="justify-content-center">
                      <Badge
                        style={{ backgroundColor: access.color }}
                        variant="primary"
                        className={index === 0 ? 'beforePill' : 'afterPill'}
                      >
                        {access.text}
                      </Badge>
                    </Row>
                  ))}
                </h6>
              </span>
            ) : (
              ''
            )}
            {props.platformsUsed ? (
              <span>
                <h6>Platforms used:</h6>
                <h6>
                  {props.platformsUsed.map((platform, index) => (
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
                </h6>
              </span>
            ) : (
              ''
            )}
            {props.ensAddress ? (
              <span>
                <h6>View contract on Etherscan:</h6>
                <h6>
                  <a
                    href={`https://etherscan.io/address/${props.ensAddress}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Badge variant="info">{props.ensAddress}</Badge>
                  </a>
                </h6>
              </span>
            ) : null}
            {props.metamaskInteractionsSaved ? (
              <span>
                <h6>
                  Wallet interactions saved: <br />
                  <b style={{ fontSize: '1.4em' }}>
                    {props.metamaskInteractionsSaved.map(
                      interactions => interactions.saved
                    )}
                  </b>
                </h6>
              </span>
            ) : null}
          </Col>
        </Row>
      </Col>
      <Col>
        {props.isOrderable ? (
          <div className="mt-md-2 mt-2 pb-md-0 pb-3 d-flex justify-content-center">
            <a href={`/zaps/${props.id}`}>Learn More</a>
          </div>
        ) : null}
        <div className="my-3 text-center">
          <BuyButtonContainer {...props} block />
          {/* <GiftButton {...props} block /> */}
        </div>
      </Col>
    </Col>
  );
};

const ZapListView = props => {
  const { data } = props;
  return (
    <Container>
      <NavigationBar />
      <Row>{data.filter(zap => zap.isOrderable).map(zap => Zap(zap))}</Row>
      <hr />
      {footerButtons()}
      <br />
      <br />
    </Container>
  );
};

export default ZapListView;

export { Zap };
