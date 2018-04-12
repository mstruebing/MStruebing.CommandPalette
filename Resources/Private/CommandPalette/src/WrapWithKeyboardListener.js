import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import keydown, { Keys } from 'react-keydown';
import mergeClassNames from 'classnames';

import CommandPalette from './CommandPalette';
import styles from './styles.css';

const wrapWithKeyboardListener = OriginalApp => {
    return class CustomKeyboardListener extends PureComponent {
        state = {
            isOpen: false
        };

        @keydown( 'ctrl+/', 'esc' )
        handleKeyPress(event) {
            if (event.key === '/'  && event.ctrlKey) {
                this.toggle();
            }

            if (event.key === 'Escape' && this.state.isOpen) {
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
                    <OriginalApp {...this.props}/>
                </React.Fragment>
            );
        }

        renderPalette = () => this.state.isOpen ? (
                <div className={styles.palette}>
                    <CommandPalette close={this.close}/>
                </div>
            ) : (
                null
            );
    }
};

export default wrapWithKeyboardListener;
