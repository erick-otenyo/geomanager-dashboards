/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Context from './context';

function ConfigProvider({config, children}) {
    return <Context.Provider value={config}>{children}</Context.Provider>;
}

ConfigProvider.propTypes = {
    children: PropTypes.node,
    config: PropTypes.object.isRequired,
};

export default ConfigProvider;
