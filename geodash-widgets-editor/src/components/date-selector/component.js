import React, {useEffect, useRef} from 'react';
import AirDateTimeselector from "./air-dateselector";

import "./air-dateselector.css";

export default function DateTimeSelector({timestamps, onChange, value, dateFormat}) {

    const selectorContainer = useRef(null);
    const selector = useRef(null);


    const onTimeChange = (time) => {
        const formattedTime = time.toISOString();
        onChange(formattedTime);
    }

    useEffect(() => {
        if (selector.current) return;


        const options = {
            includeDates: timestamps,
            selectedDate: value,
            onSelect: onTimeChange,
            position: "top left",
            dateFormat
        };

        selector.current = new AirDateTimeselector(selectorContainer.current, options);
    });

    return (
        <div>
            <div ref={selectorContainer} className="date-container"/>
        </div>
    );
}