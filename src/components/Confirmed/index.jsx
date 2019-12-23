import React from 'react';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Confirmed = props => (
  <div className="container loading">
    <div className="row">
      <div className="col-md-12 text-center pt-4">
        <FontAwesomeIcon size="2x" color="green" icon={faCheckCircle} />
        {props.txId ? (
          <Row className="justify-content-center">
            <a
              href={`https://etherscan.io/tx/${props.txId}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              View Transaction on Etherscan
            </a>
          </Row>
        ) : null}
        <Row />
      </div>
    </div>
  </div>
);

export default Confirmed;
