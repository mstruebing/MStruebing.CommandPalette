import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Dialog, Button, TextInput} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {actions} from '@neos-project/neos-ui-redux-store';
import {$transform, $get} from 'plow-js';
import styles from './styles.css';

@connect(
    $transform({
        previewUrl: $get('ui.contentCanvas.previewUrl')
    }), {
        toggleFullScreen: actions.UI.FullScreen.toggle,
        toggleLeftSideBar: actions.UI.LeftSideBar.toggle,
        toggleRightSideBar: actions.UI.RightSideBar.toggle
    }
)
export default class HelpDialog extends PureComponent {
    static propTypes = {
        toggleFullScreen: PropTypes.func,
        toggleLeftSideBar: PropTypes.func,
        toggleRightSideBar: PropTypes.func,
        previewUrl: PropTypes.string,
        searchTerm: PropTypes.string
    };

    state = {
        searchTerm: ''
    };

    constructor(props) {
        super(props);
        this.handleUpdateSearchTerm = this.onUpdateSearchTerm.bind(this);
        this.handlePressEnterKey = this.onPressEnterKey.bind(this);

        this.state = {
            searchTerm: '',
            shortcuts: [
                {
                    label: "Toggle FullScreen",
                    action: this.props.toggleFullScreen
                },
                {
                    label: "Toggle LeftSideBar",
                    action: this.props.toggleLeftSideBar
                },
                {
                    label: "Toggle RightSideBar",
                    action: this.props.toggleRightSideBar
                },
                {
                    label: "Open Preview",
                    action: () => window.open(this.props.previewUrl, "blank")
                }
            ]
        };
    }

    onUpdateSearchTerm(searchTerm = '') {
        this.setState({
            searchTerm
        });
    }

    onPressEnterKey() {
        const [head, ..._] = this.getFilteredShortcuts();
        head && head.action && head.action();
        this.reset();
    }

    reset() {
        this.onUpdateSearchTerm();
        this.props.onRequestClose();
    }

    getFilteredShortcuts() {
        return this.state.shortcuts.filter(shortcut => shortcut.label.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    }

    render() {
        const {
            title,
            isOpen,
            onRequestClose,
        } = this.props;

        const myButton = (action, label, key) => <Button style={key === 0 ? "brand" : "lighter"} onClick={action} key={key}>{label}</Button>;

        const children = () => {
            const placeholder = 'What do you want to do?'

            return (
                <div className={styles.dialog}>
                    <div className={styles.searchBar}>
                        <TextInput
                            onEnterKey={this.handlePressEnterKey}
                            onChange={this.handleUpdateSearchTerm}
                            placeholder={placeholder}
                            setFocus={true}
                            />
                    </div>
                    <div className={styles.actions}>
                        {this.getFilteredShortcuts().map((shortcut, index) => myButton(shortcut.action, shortcut.label, index, shortcut.customAction))}
                    </div>
                </div>
            );
        };

        const actions = [<Button style="lighter" onClick={onRequestClose}>Close</Button>];

        return (
            <Dialog
                title={title}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                actions={actions}
                children={children()}
                />);
    }
}
