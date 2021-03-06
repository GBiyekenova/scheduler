import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = () => {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }
  };

  let numOfSpots = formatSpots();

  return (
    <li
      onClick={() => props.setDay(props.name)}
      data-testid="day"
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{numOfSpots}</h3>
    </li>
  );
}
