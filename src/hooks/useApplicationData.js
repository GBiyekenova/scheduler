import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useApplicationData() {
  /*The state object will maintain the same structure.
  The setDay action can be used to set the current day.
  The bookInterview action makes an HTTP request and updates the local state.
  The cancelInterview action makes an HTTP request and updates the local state.*/

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
//update state with days inside updateSpots
  const updateSpots = async (day, spotIncrement) => {
    // const selectedDay = state.days.filter((day) => {
    //   return state.day === day.name;
    // })

    // Day Object example:
    // {id: 1, name: 'Monday', appointments: Array(5), interviewers: Array(5), spots: 0}
    
    //const x = day.spots - 1;
    //let dayObjUpdated;
    if (state.days.length === 0) {
      return
    }
    const daysArr = [...state.days]

    console.log("inside updated");
    console.log(daysArr);
    
    for (let dayObj of daysArr) {
      if (day === dayObj.name) {
        console.log(dayObj.spots)
        //console.log({spotIncrement})
        dayObj.spots = dayObj.spots + spotIncrement // add the -1 or +1 to the current day.spots (based on adding or removing an interview)

        console.log(dayObj.spots)
        //dayObjUpdated = dayObj
      }
    }

    console.log(daysArr);
    //setState({...state, days: [ ...daysArr]});
    return daysArr//dayObjUpdated;
 
  };

  // useEffect(() => {
  //   // updateSpots();
  // },[state.appointments, state.day, updateSpots]);

  async function bookInterview(id, interview) { 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    let flag = false; // newly created appointment 
    if(state.appointments[id].interview != null){
      flag = true; // changing existing appointment
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // setState({
    //   ...state,
    //   appointments,
    // });
    await axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview,
    })
      // setState({ ...state, appointments });
      //console.log('add interview =>', updateSpots(state.day, -1)); 
      let updatedDays = await updateSpots(state.day, flag ? 0 : -1);
   
      setState({
        ...state,
        appointments,
        // appointments: {
        //   ...state.appointments,
        //   [id]: { ...state.appointments[id], interview: null },
        // },
        days: [...updatedDays]
      });
      return console.log("setting state"); 
  }

  const setDay = (day) => setState({ ...state, day });

  const cancelInterview = async (id) => {
    if (id in state.appointments) {
      await axios.delete(`http://localhost:8001/api/appointments/${id}`)
        //console.log('cancel interview =>', updateSpots(state.day, 1));
        let updatedDays = await updateSpots(state.day, 1);
        setState({
          ...state,
          appointments: {
            ...state.appointments,
            [id]: { ...state.appointments[id], interview: null },
          },
          days: [...updatedDays]
        });  
    }
  };
  // const cancelInterview = async (id) => {
  //   if (id in state.appointments) {
      
  //     setState({
  //       ...state,
  //       appointments: {
  //         ...state.appointments,
  //         [id]: { ...state.appointments[id], interview: null },
  //       },

  //     });
  //     axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
  //       //console.log('cancel interview =>', updateSpots(state.day, 1));
  //       updateSpots(state.day, 1)
  //     });
  //   }
  // };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  };
}
