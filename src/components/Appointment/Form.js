import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  //console.log(props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
//console.log(props.interviewers)
  function reset() {
    setStudent("")
    setInterviewer("")
    setError("")
  }

  function cancel() {
    reset()
    props.onCancel()
  } 
  
  function validate() {
    console.log(student)
    if (student === "") {
      console.log("IN ERROR")
      setError("student name cannot be blank");
      return;
    }
    console.log("RETURN")
    //return
    setError("");
    props.onSave(student, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => {
          setError("");
          setStudent(event.target.value);
        }}
        data-testid="student-name-input"
        //onClick={validate}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList
      interviewers={props.interviewers}
      interviewer={interviewer}
      setInterviewer={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel} >Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}