import React, { useState } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode"
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const [id, setId] = useState("");

  console.log(props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const LOADINGDELETE = "LOADINGDELETE";
  const EDIT = "EDIT";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  }
    
  const deleteAppointment = (event) => {
    setId(event.target.id)
    transition(DELETING); 
  }

  const confirm = () => {
      props.cancelInterview(id); 
      transition(LOADINGDELETE)
      setTimeout(() => {
        transition(EMPTY)
      }, 1000)
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment"> 
    <Header time={props.time}/>
    {props.time ? `Appointment at ${props.time}` : "No Appointments"}

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={deleteAppointment}
    appointmentId={props.id}
    onEdit={() => transition(EDIT)}
    />
    )}
    {mode === CREATE && <Form 
    //student={props.interview.student}
    onSave={save}
      interviewers={props.interviewers}
       onCancel={back} 

       /> }
    {mode === SAVING && <Status  message="Saving" />}
    {mode === LOADINGDELETE && <Status message="Deleting" />}
    {mode === DELETING && <Confirm onCancel={back} onConfirm={confirm} message="Deleting" />}
    {mode === EDIT && <Form 
    bookInterview={props.bookInterview}
    onSave={save}
    interviewers={props.interviewers}
    student={props.interview.student}
    interviewer={props.interview.interviewer.id} 
    onCancel={back}
    />}
    
    </article>
  )
}
//onSave={() => transition(SHOW)}