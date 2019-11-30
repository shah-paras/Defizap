import React, { PureComponent } from 'react';
import autobind from 'react-autobind';

import SurveyPageView2 from './SurveyPageView2';
import surveyList from '../../constants/SurveyQuestions';
import surveyResponse from '../../constants/SurveyResults';
import { registerEvent } from '../../api/googleAnalytics';
import { SURVEY_COMPLETED } from '../../constants/googleAnalytics';

class SurveyPageContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 1,
      answers: [],
      answer: '',
      isLoading: false,
      surveyComplete: false,
      activeStep: 0
    };
    autobind(this);
  }

  onAnswer = answer => {
    this.setState({
      answers: [...this.state.answers, answer]
    });
    this.setActiveStep(this.state.activeStep + 1);
  };

  setActiveStep = activeStep => {
    if (activeStep === 4) {
      const result = this.onCompletion();
      this.setState({ answer: result });
    }
    this.setState({ activeStep });
  };

  reDoSurvey = () => {
    this.setState({
      questionNumber: 1,
      answers: [],
      answer: '',
      isLoading: false,
      surveyComplete: false
    });
    this.setActiveStep(0);
  };

  onCompletion = () => {
    const { answers } = this.state;
    const strategy =
      surveyResponse[answers[0]][answers[1]][answers[2]][answers[3]];
    return strategy;
  };

  submitResults = () => {
    registerEvent({
      category: SURVEY_COMPLETED,
      action: 'User clicked on Get Results.'
    });
    const result = this.onCompletion();

    this.setState({ isLoading: false, surveyComplete: true, answer: result });
  };

  render() {
    const {
      questionNumber,
      isLoading,
      answer,
      surveyComplete,
      activeStep
    } = this.state;
    return (
      <SurveyPageView2
        questionNumber={questionNumber}
        isLoading={isLoading}
        onAnswer={this.onAnswer}
        onCompletion={this.onCompletion}
        surveyList={surveyList}
        reDoSurvey={this.reDoSurvey}
        submitResults={this.submitResults}
        surveyComplete={surveyComplete}
        answer={answer}
        activeStep={activeStep}
        setActiveStep={this.setActiveStep}
      />
    );
  }
}

export default SurveyPageContainer;
