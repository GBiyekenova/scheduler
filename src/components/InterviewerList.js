import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.js";

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        selected={interviewer.id === props.interviewer}
        {...interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
