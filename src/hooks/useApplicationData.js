import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  //setting main state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //updates available spots for the day
  const updateSpots = async (day, spotIncrement) => {
    if (state.days.length === 0) {
      return;
    }
    const daysArr = [...state.days];

    for (let i = 0; i < daysArr.length; i++) {
      const dayObj = daysArr[i];
      if (day === dayObj.name) {
        const newDayObj = { ...dayObj, spots: dayObj.spots + spotIncrement };
        daysArr[i] = newDayObj;
      }
    }
    return daysArr;
  };

  //adds a new appointment or modifies an existing appointment
  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    let flag = false; // newly created appointment
    if (state.appointments[id].interview != null) {
      flag = true; // changing existing appointment
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //updates database
    await axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview,
    });

    //if editing an interview, then do not change number of spots
    let updatedDays = await updateSpots(state.day, flag ? 0 : -1);

    setState({
      ...state,
      appointments,
      days: [...updatedDays],
    });
    return console.log("setting state");
  }

  const setDay = (day) => setState({ ...state, day });

  //deletes interviews
  const cancelInterview = async (id) => {
    if (id in state.appointments) {
      //deletes appointment data from database
      await axios.delete(`http://localhost:8001/api/appointments/${id}`);
      let updatedDays = await updateSpots(state.day, 1);
      setState({
        ...state,
        appointments: {
          ...state.appointments,
          [id]: { ...state.appointments[id], interview: null },
        },
        days: [...updatedDays],
      });
    }
  };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  };
}
