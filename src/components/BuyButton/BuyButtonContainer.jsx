import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';
import isEmpty from 'lodash/isEmpty';

import '../../App.css';
import Loading from '../Loading';
import contractProvider from '../../utils/web3DataProvider';
import { registerEvent } from '../../api/googleAnalytics';
import { BUY_ZAP, INITIATE_PURCHASE } from '../../constants/googleAnalytics';
import {
  fetchRequest,
  buildOptions,
  checkResponse
} from '../../api/apiHelpers';
import { onboard, web3 } from '../../web3/web3';

class LenderBuyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
      account: null,
      showLoader: false,
      gasMode: 'average'
    };
  }

  async getGas() {
    const response = await fetchRequest(
      'https://ethgasstation.info/json/ethgasAPI.json',
      () => buildOptions()
    ).then(checkResponse('Failed to get gas from Gas Station'));
    const { gasMode } = this.state;
    const gasValue = (response[`${gasMode}`] / 10) * 1000000000;
    this.setState({ gasValue });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.toggle();
    registerEvent({
      category: INITIATE_PURCHASE,
      action: this.props.name
    });
    try {
      const walletSelection = await onboard.walletSelect();
      const walletCheck = await onboard.walletCheck();
      if (walletSelection && walletCheck) {
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        await this.getGas();
        const {
          contractAbi,
          contractAddress,
          gas,
          gasPrice
        } = contractProvider(this.props.name);
        const valueToInvest = this.state.value;
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        this.setState({ showLoader: true });
        let tx;
        if (this.props.name === 'Lender') {
          tx = await contract.methods.SafeNotSorryZapInvestment();
        } else if (this.props.name === 'ETH Maximalist') {
          tx = await contract.methods.ETHMaximalistZAP();
        } else {
          tx = await contract.methods.LetsInvest();
        }
        tx.send({
          from: this.state.account,
          value: web3.utils.toWei(valueToInvest, 'ether'),
          gas,
          gasPrice: isEmpty(gasPrice) ? String(this.state.gasValue) : gasPrice
        })
          .on('receipt', receipt => {
            console.log(
              'the tx hash of the sendInvestment function is',
              receipt.transactionHash
            );
            this.setState({
              depositTxHash: receipt.transactionHash,
              showLoader: false
            });
          })
          .on('error', error => {
            alert(
              'Sorry, we encountered an error, please try again or reach out to us if this persists.'
            );
            this.setState({ showLoader: false });
          });
        console.log('The Transaction is ', tx);
      }
    } catch (error) {
      console.error(error);
    }
  };

  setGasMode = async gasMode => {
    this.setState({ gasMode });
  };

  renderModal() {
    const { open, value } = this.state;
    const { name } = this.props;
    return (
      <Modal isOpen={open} toggle={this.toggle} centered>
        <ModalBody>
          <form onSubmit={this.handleSubmit}>
            <div className="buycontainer">
              <h1>{name}</h1>
              <div className="buycontents">
                <p className="buytext pt-4 mr-2">INVEST</p>
                <input
                  min="0"
                  value={value}
                  onChange={this.handleChange}
                  placeholder="0.0"
                  required
                  style={
                    value && value.length > 3
                      ? {
                          width: `${80 + value.length * 20}px`
                        }
                      : {
                          width: '80px'
                        }
                  }
                />
                <p className="buytext pt-4 ml-2">ETH</p>
              </div>
              <Row className="justify-content-center py-3">
                Select Transaction Speed:{' '}
              </Row>
              <Row className="justify-content-center py-2">
                <ToggleButtonGroup
                  type="radio"
                  name="gasOptions"
                  value={this.state.gasMode}
                  onChange={this.setGasMode}
                >
                  <ToggleButton
                    variant="outline-success"
                    size="lg"
                    value="average"
                  >
                    Slow
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-success"
                    size="lg"
                    value="fast"
                  >
                    Average
                  </ToggleButton>
                  <ToggleButton
                    size="lg"
                    value="fastest"
                    variant="outline-success"
                  >
                    Fast
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
            </div>
            <div className="my-4 row justify-content-center">
              <input
                type="submit"
                className="font20 mx-3 btn btn-outline-success btn-large shadow px-4 py-2"
                value="Confirm"
              />
              <div
                className="font20 btn btn-outline-dark btn-large shadow px-4 py-2 mx-3"
                onClick={this.toggle}
              >
                Cancel
              </div>
              {this.state.showLoader ? <Loading /> : null}
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }

  render() {
    const { isOrderable, name } = this.props;
    return (
      <>
        {isOrderable ? (
          <Button
            onClick={() => {
              this.setState({ open: true });
              registerEvent({
                category: BUY_ZAP,
                action: name
              });
            }}
            disabled={!isOrderable}
            variant="outline-success"
            size="lg"
            className="m-2"
          >
            Buy
          </Button>
        ) : (
          <Button
            onClick={() => this.setState({ open: true })}
            disabled={!isOrderable}
            variant="outline-success"
            size="lg"
            className="m-2"
          >
            Coming Soon
          </Button>
        )}
        {this.renderModal()}
      </>
    );
  }
}

export default LenderBuyButton;
