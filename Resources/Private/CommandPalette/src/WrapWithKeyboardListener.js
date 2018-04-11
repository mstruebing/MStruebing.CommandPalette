import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';
import mergeClassNames from 'classnames';

import CommandPalette from './CommandPalette';
import styles from './styles.css';

const wrapWithKeyboardListener = Container => {
    return class CustomKeyboardListener extends PureComponent {
        state = {
            isOpen: false
        };

        @keydown( 'ctrl+/', 'esc' )
        handleKeyPress(event) {
            if (event.key === '/'  && event.ctrlKey) {
                this.toggle();
            }

            if (event.key === 'Escape') {
                this.close();
            }
        }

        toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }

        close = () => {
            this.setState({
                isOpen: false
            });
        }

        render() {
            return (
                <React.Fragment>
                    {this.renderPalette()}
                    <Container {...this.props}/>
                </React.Fragment>
            );
        }

        renderPalette = () => {
            const isOpen = this.state.isOpen;

            const finalClassName = mergeClassNames({
                [styles.palette]: true,
                [styles.inactive]: !isOpen
            });

            return (
                <div className={finalClassName}>
                    <CommandPalette close={this.close}/>
                </div>
            );
        }
    }
};

export default wrapWithKeyboardListener;
