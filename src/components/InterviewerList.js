import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.js";

export default function InterviewerList(props) {
  //console.log(props)
  const parsedInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        setInterviewer={props.onChange}
        selected={interviewer.id === props.value} 
        set={props.setInterviewer}
        {...interviewer} 
      />
    );
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}