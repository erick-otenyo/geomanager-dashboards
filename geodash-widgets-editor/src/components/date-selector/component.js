import React, {useEffect, useRef} from 'react';
import AirDateTimeselector from "./air-dateselector";
import {format} from "date-fns";

import "./air-dateselector.css";

export default function DateTimeSelector({timestamps, onChange, value}) {
    const selectorContainer = useRef(null);
    const selector = useRef(null);

    const onTimeChange = (time) => {
        const formattedTime = format(time, "yyyy-MM-dd HH:mm");
        onChange(formattedTime);
    }

    useEffect(() => {
        if (selector.current) return; // initialize map only once

        const options = {
            includeDates: timestamps,
            onSelect: onTimeChange,
            position: "top left",
            selectedDate: value,
        }
        selector.current = new AirDateTimeselector(selectorContainer.current, options);
    });

    return (
        <div>
            <div ref={selectorContainer} className="date-container"/>
        </div>
    );
}