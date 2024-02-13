import Map from './map';

import "./style.scss"

const MapPreview = (props) => {
    return (
        <div className="c-map-preview">
            <header className="map-header">
                <div className="map-title">
                    Trees cover 35% of global land area
                </div>
                <div className="map-buttons">

                </div>
            </header>
            <div className="map-container">
                <Map {...props} />
            </div>
            <div className="map-caption">
                Hansen et al. 2013
            </div>
        </div>
    );
}

export default MapPreview;