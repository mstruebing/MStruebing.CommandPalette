import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';

const wrapWithKeyboardListener = actions => Container => {
    return class CustomKeyboardListener extends PureComponent {
        @keydown( 'ctrl+/' )
        handleKeyPress(event) {
            if (event.key === '/'  && event.ctrlKey) {
                if (Array.isArray(actions)) {
                    this.triggerActions(actions);
                } else if (typeof actions === 'function')  {
                    this.triggerActions([actions]);
                } else {
                    console.error('actions needs to be an array or function but is of type', typeof actions);
                }
            }
        }

        triggerActions(actions) {
            actions.map(action => {
                console.log( action );
            });
        }

        render() {
            const props = this.props;
            return (
                <Container {...props}/>
            );
        }
    }
};

export default wrapWithKeyboardListener;
