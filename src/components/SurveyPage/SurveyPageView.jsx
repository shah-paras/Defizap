import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';

import NavigationBar from '../NavigationBar';
import styles from './SurveyPageView.module.css';
import ZapFullView from '../Zaps/ZapFullView';
import Zaps from '../../constants/Zaps';
import { registerEvent } from '../../api/googleAnalytics';
import { GENERATE_ZAP, SURVEY_PAGE } from '../../constants/googleAnalytics';

const SurveyPageView = props => {
  const {
    questionNumber,
    onAnswer,
    surveyList,
    reDoSurvey,
    surveyComplete,
    submitResults,
    isLoading,
    answer
  } = props;

  const generateResult = () => {
    return isEmpty(answer) ? null : (
      <>
        <br /> <br />
        <h4>
          You might find this Zap useful: <br />
        </h4>
        <ZapFullView
          name={Zaps[answer].name}
          components={Zaps[answer].components}
          isOrderable={Zaps[answer].isOrderable}
          description={Zaps[answer].description}
        />
        <Row className="justify-content-center pb-3">
          <Button
            variant="info"
            target="_blank"
            size="lg"
            href="https://defizap.typeform.com/to/UZSZg5"
            type="link"
            className="m-3"
            block
            onClick={() =>
              registerEvent({
                category: GENERATE_ZAP,
                action: SURVEY_PAGE
              })
            }
          >
            Don&apos;t see your Zap? Submit a request and we will create one!
          </Button>
        </Row>
        <Row>
          <h5 style={{ fontSize: 15 }} className="mx-3">
            DISCLOSURE:
            <p>
              This is not Investment Advice. Do not make investment decisions
              solely based on results generated by this tool. This Project is in
              Beta. Use at your own discretion.
            </p>
            <p>
              Please note that we are not licensed financial advisors under any
              law. Please Consult your own independent investment advisor before
              making any Investment Decisions
            </p>
          </h5>
        </Row>
      </>
    );
  };

  const surveyCompleted = () => (
    <>
      <div key={questionNumber}>
        <Container>
          <NavigationBar />
          {surveyComplete ? (
            <Button
              variant="outline-primary"
              onClick={reDoSurvey}
              className="mx-1 px-1"
              size="lg"
            >
              Start Over
            </Button>
          ) : (
            <>
              <h4>
                Answer a few multiple choice questions to see which Zap might
                fit your needs
              </h4>
              <br />
              <Button
                variant="primary"
                onClick={submitResults}
                className="mx-3 px-3"
                size="lg"
                // block
              >
                Get Results
              </Button>{' '}
            </>
          )}
          {isLoading ? (
            <>
              <br />
              <Spinner animation="grow" />
              <Spinner animation="grow" />
              <Spinner animation="grow" />
              <Spinner animation="grow" />
              <Spinner animation="grow" />
            </>
          ) : (
            generateResult()
          )}
        </Container>
      </div>
    </>
  );

  const questions = () => {
    const questionsList = surveyList.map(item => {
      return (
        <>
          <div key={questionNumber}>
            <Container key={questionNumber}>
              <NavigationBar />
              <h4>
                Answer a few multiple choice questions to see which Zap might
                fit your needs
              </h4>
              <br />
              <h5 style={{ fontSize: 15 }}>
                Question {questionNumber} out of 4
              </h5>
              <h4>{item.question}</h4>
              <ol type="A">
                {item.options.map(option => {
                  return (
                    <li key={option.value} className="m-3 pl-2 px-2">
                      <Button
                        variant="outline-primary"
                        size="lg"
                        onClick={() => onAnswer(option.key)}
                        className="shadow"
                        block
                      >
                        {option.value}
                      </Button>
                    </li>
                  );
                })}
              </ol>
              <Row>
                <h5 style={{ fontSize: 15 }} className="m-3">
                  DISCLOSURE:
                  <p>
                    This is not Investment Advice. Do not make investment
                    decisions solely based on results generated by this tool.
                    This Project is in Beta. Use at your own discretion.
                  </p>
                  <p>
                    Please note that we are not licensed financial advisors
                    under any law. Please Consult your own independent
                    investment advisor before making any Investment Decisions
                  </p>
                </h5>
              </Row>
            </Container>
          </div>
        </>
      );
    });
    return questionsList[questionNumber - 1];
  };

  const questionaire = () => {
    return (
      <div className={styles.background}>
        {surveyList.length >= questionNumber ? questions() : surveyCompleted()}
      </div>
    );
  };

  return questionaire(questionNumber);
};

export default SurveyPageView;
