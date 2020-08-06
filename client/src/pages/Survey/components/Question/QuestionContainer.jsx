import React from "react";
import { connect } from "react-redux";

import {
	getCurrentQuestionData,
	getCurrentQuestionIndex,
	getLastQuestionIndex,
	getCurrentQuestionAnswer,
} from "redux/survey/survey-selectors";
import {
	submitAnswer,
	addAnswer,
	removeAnswer,
} from "redux/survey/survey-operations";

import Question from "./Question";

const mapStateToProps = (state) => ({
	question: getCurrentQuestionData(state),
	questionIndex: getCurrentQuestionIndex(state),
	lastQuestionIndex: getLastQuestionIndex(state),
	currentAnswer: getCurrentQuestionAnswer(state),
});

const mapDispatchToProps = (dispatch) => ({
	submitAnswer: (data) => dispatch(submitAnswer(data)),
	addAnswer: (data) => dispatch(addAnswer(data)),
	removeAnswer: (data) => dispatch(removeAnswer(data)),
});

const QuestionContainer = (props) => <Question {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
