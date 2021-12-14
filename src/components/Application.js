import React, { useState, useEffect } from "react";
import axios from "axios";


import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment/index.js";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      //console.log(all)
      setState(prev => ({ ...prev, days, appointments, interviewers }));

      //console.log(state.interviewers)
    });
  },[])

  const dailyAppointments = getAppointmentsForDay(state, state.day);  

  const interviewers=getInterviewersForDay(state, state.day);
  console.log("interviewers",state.day, interviewers)
  
  const setDay = day => setState({ ...state, day });

  const func = () => {
    const state1 = { day: "Monday", days: [] };
    setState({ ...state1, day: "Tuesday" });
} 

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointment);
    console.log(appointments);
    console.log(state)
    setState({
      ...state,
      appointments
    });

    axios.PUT('http://localhost:8001/api/appointments/:id')
  }

  const appointmentList= dailyAppointments.map(appointment => {
    const interview=getInterview(state, appointment.interview);

  return <Appointment 
  key={appointment.id} 
  {...appointment}
   bookInterview={bookInterview}
   interviewers={interviewers} 
    interview={interview}
      />
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
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
  onClick={func}
/>
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
