import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  console.log(props);
  const parsedDays = props.days.map(day => {
  return (
  <DayListItem 
  key={props.days.id} 
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