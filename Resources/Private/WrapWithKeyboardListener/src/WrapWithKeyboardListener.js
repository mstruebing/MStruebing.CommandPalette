import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';
import HelpDialog from './HelpDialog';

const wrapWithKeyboardListener = actions => Container => {
    return class CustomKeyboardListener extends PureComponent {
        state = {
            showDialog: false
        };

        @keydown( 'ctrl+/' )
        handleKeyPress(event) {
            if (event.key === '/'  && event.ctrlKey) {
                if (Array.isArray(actions)) {
                    // this could be some shortcut actions
                    this.triggerActions(actions);
                } else if (typeof actions === 'function')  {
                    // this could be some shortcut actions
                    this.triggerActions([actions]);
                } else {
                    // this could be an overview
                    // in form of a dialog in case
                    // no shortcuts are defined
                    this.toggleShowDialog();
                }
            }
        }

        toggleShowDialog() {
            this.setState({
                showDialog: !this.state.showDialog
            });
        }

        closeDialog() {
            this.setState({
                showDialog: false
            });
        }

        triggerActions(actions) {
            actions.map(action => {
                console.log( action );
            });
        }

        render() {
            return (
                <React.Fragment>
                    {this.renderDialog()}
                    <Container {...this.props}/>
                </React.Fragment>
            );
        }

        renderDialog() {
            const title = 'Quick Access Dialog'
            const isOpen = this.state.showDialog;
            const onRequestClose = this.closeDialog.bind(this)

            return <HelpDialog
                    title={title}
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    />;
        }
    }
};

export default wrapWithKeyboardListener;
