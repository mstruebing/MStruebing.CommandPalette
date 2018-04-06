import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';
import {Dialog} from '@neos-project/react-ui-components';

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

        triggerActions(actions) {
            actions.map(action => {
                console.log( action );
            });
        }

        render() {
            return (
                <div>
                    {this.renderDialog()}
                    <Container {...this.props}/>
                </div>
            );
        }

        renderDialog() {
            const showDialog = this.state.showDialog;

            if (!showDialog) {
                return null;
            }

            const children = 'some children to render';
            const actions = ['Foo 1', 'Foo 2'];

            const closeDialog = () => {
                this.setState({
                    showDialog: false
                });
            }

            return <Dialog
                isOpen={showDialog}
                actions={actions}
                children={children}
                onRequestClose={closeDialog}
                />
        }
    }
};

export default wrapWithKeyboardListener;
