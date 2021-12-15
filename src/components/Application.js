import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment/index.js";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  let { state, setState, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      //console.log(all)
      setState((prev) => ({ ...prev, days, appointments, interviewers }));

      //console.log(state.interviewers)
    });
  }, [setState]);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  //const setDay = day => setState({ ...state, day });

  // async function bookInterview(id, interview) {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   // setState({
  //   //   ...state,
  //   //   appointments
  //   // });

  //   await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  //   //setState({ ...state, appointments:appointments})

  // }

  // const cancelInterview = async (id) => {
  //   //console.log(state.appointments);
  //   //console.log(id);
  //   if (id in state.appointments) {
  //     //await axios.put(`http://localhost:8001/api/appointments/${id}`) //put call to make database throw an error

  //   return state.appointments[id].interview = null
  //   }
  //   //console.log(state.appointments[id])

  // }

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        bookInterview={bookInterview}
        interviewers={interviewers}
        interview={interview}
        cancelInterview={cancelInterview}
      />
    );
  });

  //console.log(state.interviewers)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
