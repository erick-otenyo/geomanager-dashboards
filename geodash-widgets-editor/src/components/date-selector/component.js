import React, {useEffect, useRef} from 'react';
import AirDateTimeselector from "./air-dateselector";

import "./air-dateselector.css";

export default function DateTimeSelector({timestamps, onChange, selectedDate}) {
    const selectorContainer = useRef(null);
    const selector = useRef(null);

    useEffect(() => {
        if (selector.current) return; // initialize map only once

        const options = {
            includeDates: timestamps,
            onSelect: onChange,
            position: "top right",
        }

        selector.current = new AirDateTimeselector(selectorContainer.current, options);
    });

    return (
        <div>
            <div ref={selectorContainer} className="date-container"/>
        </div>
    );
}