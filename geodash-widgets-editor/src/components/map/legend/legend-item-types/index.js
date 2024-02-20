import React from "react";
import {
    LegendItemTypeBasic,
    LegendItemTypeChoropleth,
    LegendItemTypeGradient,
    LegendItemTypeProportional,
    LegendItemTypes as VizzLegendItemTypes,
    Spinner,
} from 'vizzuality-components';

import LegendItemTypeImage from "./legend-item-type-image";

import isEmpty from 'lodash/isEmpty';


class LegendItemTypes extends VizzLegendItemTypes {
    render() {
        const {children, activeLayer: propsActiveLayer} = this.props;
        const {loading, activeLayer: stateActiveLayer} = this.state;
        const activeLayer = !isEmpty(stateActiveLayer) ? stateActiveLayer : propsActiveLayer;

        const {legendConfig} = activeLayer || {};
        const {url} = legendConfig || {};
        const shouldRender = !url || (url && !isEmpty(stateActiveLayer));

        return (
            <div className="c-legend-item-types">
                {(url && loading) && (
                    <Spinner
                        position="relative"
                        style={{
                            box: {width: 20, height: 20}
                        }}
                    />
                )}

                {shouldRender && !!React.Children.count(children) &&
                    React.Children.map(children, child => (React.isValidElement(child) && typeof child.type !== 'string' ?
                            React.cloneElement(child, {...this.props})
                            :
                            child
                    ))}

                {/* If there is no children defined, let's use the components we have */}
                {(shouldRender && !React.Children.count(children)) && <LegendItemTypeBasic {...this.props} />}
                {(shouldRender && !React.Children.count(children)) && <LegendItemTypeChoropleth {...this.props} />}
                {(shouldRender && !React.Children.count(children)) && <LegendItemTypeGradient {...this.props} />}
                {(shouldRender && !React.Children.count(children)) && <LegendItemTypeProportional {...this.props} />}
                {(shouldRender && !React.Children.count(children)) && <LegendItemTypeImage {...this.props} />}

            </div>
        );
    }
}

export default LegendItemTypes;