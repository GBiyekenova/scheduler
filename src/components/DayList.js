import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  //console.log(props);
  const parsedDays = props.days.map(day => {
    //console.log(day);
  return (
  <DayListItem 
  key={day.id} 
  setDay={props.onChange} 
  selected={day.name === props.value} 
  {...day} 
  />)
});
  return (
    <ul>
      {parsedDays}
    </ul>
  )
};