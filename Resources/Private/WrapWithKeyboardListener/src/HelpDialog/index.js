import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Dialog} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {actions} from '@neos-project/neos-ui-redux-store';

@connect(null, {
    toggleFullScreen: actions.UI.FullScreen.toggle,
    toggleLeftSideBar: actions.UI.LeftSideBar.toggle,
    toggleRightSideBar: actions.UI.RightSideBar.toggle
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
            toggleFullScreen,
            toggleLeftSideBar,
            toggleRightSideBar
        } = this.props;

        const children = () => {
            return (
                <div>
                    <div class="helpText">
                        <p>This is some help</p>
                        <p>If you have any questions regarding this
                            software please contact the administrator:
                            <a href="mailto:admin@mycompany.com">admin@mycompany.com</a>
                        </p>
                    </div>
                    <div class="actions">
                        <button onClick={toggleFullScreen}>Toggle Fullscreen</button>
                        <button onClick={toggleLeftSideBar}>Toggle LeftSideBar</button>
                        <button onClick={toggleRightSideBar}>Toggle RightSideBar</button>
                    </div>
                </div>
            );
        };

        const actions = ['action1', 'action2'];

        return (<Dialog
            title={title}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            actions={actions}
            children={children()}
            />);
    }
}
