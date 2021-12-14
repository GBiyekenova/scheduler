export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter((d) => d.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const idArr = filteredDays[0].appointments;
  const appointments = Object.values(state.appointments).filter((app) => idArr.indexOf(app.id) > -1);
  //console.log(appointments);
  return appointments;
}


export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const filteredInterview = Object.values(state.interviewers).filter((intrwr) => intrwr.id === interview.interviewer);

  if (filteredInterview.length === 0) {
    return null;
  }
  const interviewData = {};

  interviewData.interviewer = filteredInterview[0];
  interviewData.student = interview.student


  return interviewData;
  
}

export function getInterviewersForDay(state, day) {

  const filteredDays = state.days.filter((d) => d.name === day);
  console.log(filteredDays);
  if (filteredDays.length === 0) {
    return [];
  }
  const idArr = filteredDays[0].interviewers;
  const interviewers = Object.values(state.interviewers).filter((intrwr) => idArr.indexOf(intrwr.id) > -1);
  //console.log(appointments);
  //console.log(Object.values(state.interviewers))
  return interviewers;
}
