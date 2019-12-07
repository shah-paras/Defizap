import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Donut from '../PercentageDoughnut';
import NavigationBar from '../NavigationBar';
import '../../App.css';
import {
  INDIVIDUAL_ZAP_PAGE,
  GENERATE_ZAP
} from '../../constants/googleAnalytics';
import { registerEvent } from '../../api/googleAnalytics';

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
          })
        }
      >
        Don&apos;t see your Zap? Submit a request and we will create one!
      </Button>
    </div>
  </div>
);

const Zap = props => {
  console.log('props ', props);
  return (
    <div className="m-4 p-4 bg-white flex-column">
      <Row>
        <Col
          xs={12}
          md={4}
          className="justify-content-center align-text-center"
        >
          <Donut data={props} />
        </Col>
        <Col xs={12} md={8}>
          <h3>{props.name}</h3>
          {props.output}
          <hr />
          <Button
            href={`/zaps/${props.id}`}
            size="auto"
            variant="outline-dark"
            value="Learn More"
            block
          >
            Learn More
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const ZapListView = props => {
  const { data, filterMethod, columns, showPagination } = props;
  return (
    <Container>
      <NavigationBar />
      {data.filter(zap => zap.isOrderable).map(zap => Zap(zap))}
      <hr />
      {footerButtons()}
      <br />
      <br />
    </Container>
  );
};

export default ZapListView;
