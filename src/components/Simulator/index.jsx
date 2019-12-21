import React, { PureComponent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import autobind from 'react-autobind';

import { getTokenReserves, getMarketDetails, getTradeDetails, BigNumber, formatFixed, formatFixedDecimals } from '@uniswap/sdk'
import web3 from 'web3'
import Humanize from 'humanize-plus'

import '../../App.css';

class Simulator extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            exchangeRate: 122.46,
            value: props.value,
            chainId: 1,
            decimals: 18
        };

        autobind(this);
    }

    async componentDidMount() {
        // console.log(this.props)
        const tradeDetails = await this.getTradeDetails(this.props.value || 0, this.props.tokenInfo.address)
        this.processTradeDetails(tradeDetails)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            const tradeDetails = await this.getTradeDetails(this.props.value || 0, this.props.tokenInfo.address)
            this.processTradeDetails(tradeDetails)
        }
    }

    getTokenReserves = async (tokenAddress) => {
        const checksumAddress = web3.utils.toChecksumAddress(tokenAddress)
        const tokenReserves = await getTokenReserves(checksumAddress, this.state.chainId)
        return tokenReserves
    }

    getMarketDetails = async (tokenAddress) => {
        const reserves = await this.getTokenReserves(tokenAddress)
        const marketDetails = await getMarketDetails(undefined, reserves)
        return marketDetails
    }

    getTradeDetails = async (_tradeAmount, tokenAddress) => {
        const marketDetails = await this.getMarketDetails(tokenAddress)
        const tradeAmount = (new BigNumber(_tradeAmount)).multipliedBy(10 ** this.state.decimals)
        const tradeDetails = await getTradeDetails(true, tradeAmount, marketDetails)
        return tradeDetails
    }

    processTradeDetails = (tradeDetails) => {
        const ethReserves = formatFixedDecimals(tradeDetails.marketDetailsPre.outputReserves.ethReserve.amount, 18, { decimalPlaces: 2 })
        const tokenReserves = formatFixedDecimals(tradeDetails.marketDetailsPre.outputReserves.tokenReserve.amount, 18, { decimalPlaces: 2 })
        const marketRate = formatFixed(tradeDetails.marketDetailsPre.marketRate.rate, { decimalPlaces: 2 })
        const execRate = formatFixed(tradeDetails.executionRate.rate, { decimalPlaces: 2 })
        this.setState({ ethReserves, tokenReserves, marketRate, execRate })
    }

    render() {
        const {
            value,
            tokenInfo
        } = this.props;

        const {
            ethReserves,
            tokenReserves,
            marketRate,
            execRate
        } = this.state

        if (ethReserves && tokenReserves && marketRate)
            return (
                <div style={{ fontSize: '0.85em' }}>
                    <Row className="justify-content-right pt-2">
                        <Col style={{ whiteSpace: 'nowrap' }}>
                            Exchange Rate:
                        </Col>
                        <Col>
                            1 ETH = {marketRate} {tokenInfo.name}
                        </Col>
                    </Row>

                    <Row className="justify-content-right">
                        <Col style={{ whiteSpace: 'nowrap' }}>
                            Recieved Rate:
                                        </Col>
                        <Col>
                            {execRate > 0 ? `1 ETH = ${execRate} ${tokenInfo.name}` : `-`}
                            </Col>
                    </Row>


                    <Row className="justify-content-left">
                        <Col>
                            Current Pool Size:
                    </Col>
                        <Col>
                            {Humanize.compactInteger(ethReserves, 1)} ETH + {Humanize.compactInteger(tokenReserves, 1)} {tokenInfo.name}

                        </Col>
                    </Row>
                    <Row className="justify-content-left">
                        <Col>
                            Est. Output:
                    </Col>
                        <Col style={{ color: value ? '#28a745' : null, whiteSpace: 'noWrap' }}>
                            {`${(value * 0.495).toFixed(3)} ETH + ${((value * 0.505) * execRate).toFixed(3)} ${tokenInfo.name}`}
                        </Col>
                    </Row>
                    <Row className="justify-content-left">
                        <Col>
                            Fee:
                    </Col>
                        <Col>
                            {value && execRate > 0 ? 'FREE' : `-`}

                        </Col>
                    </Row>
                </div>
            );
        else return (
            <Row className="justify-content-center pt-2">
                <Spinner animation="border">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>
        )
    }
}

export default Simulator;
