import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Dialog} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {actions} from '@neos-project/neos-ui-redux-store';

@connect(null, {
    toggleFullScreen: actions.UI.FullScreen.toggle
})
export default class HelpDialog extends PureComponent {
    static propTypes = {
        toggleFullScreen: PropTypes.func
    };

    render() {
        const {
            title,
            isOpen,
            onRequestClose,
            toggleFullScreen
        } = this.props;

        const children = 'some children to render';
        const actions = [<button onClick={toggleFullScreen}>HALLO</button>];

        return (<Dialog
            title={title}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            actions={actions}
            children={children}
            />);
    }
}
