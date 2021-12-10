import React, {useState} from 'react';
import "./InterviewerListItem.scss";
import classNames from 'classnames';


export default function InterviewerListItem(props) {
  console.log(props)

  const [selected, setSelected] = useState(props.selected)
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected//props.selected
  });

  const handleClick = () => {
    setSelected(props.id)
    props.set(props.id)
  }

  return (
    <li className={interviewerClass} onClick={handleClick}>
  {props.name && <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />}
  {(props.selected || selected) && props.name}
</li>
  )
}