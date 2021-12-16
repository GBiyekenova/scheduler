import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMDELETING = "CONFIRMDELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save funtion executes when "Save" button is clicked in Create or Edit modes.
  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  //destroy function executes when "Confirm" button in Confirm mode is clicked to delete an appointment.
  const destroy = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRMDELETING)}
          appointmentId={props.id}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMDELETING && (
        <Confirm onCancel={back} onConfirm={destroy} message="Deleting" />
      )}
      {mode === EDIT && (
        <Form
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error saving appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting appointment" onClose={() => back()} />
      )}
    </article>
  );
}
