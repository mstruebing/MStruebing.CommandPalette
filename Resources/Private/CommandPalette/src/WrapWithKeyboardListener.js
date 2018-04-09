import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';
import CommandPalette from './CommandPalette';

const wrapWithKeyboardListener = Container => {
    return class CustomKeyboardListener extends PureComponent {
        state = {
            showDialog: false
        };

        @keydown( 'ctrl+/' )
        handleKeyPress(event) {
            if (event.key === '/'  && event.ctrlKey) {
                this.toggleShowDialog();
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

        render() {
            return (
                <React.Fragment>
                    {this.renderDialog()}
                    <Container {...this.props}/>
                </React.Fragment>
            );
        }

        renderDialog() {
            const title = 'Command Palette'
            const isOpen = this.state.showDialog;
            const onRequestClose = this.closeDialog.bind(this)

            return (
                <CommandPalette
                    title={title}
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    />
            );
        }
    }
};

export default wrapWithKeyboardListener;
