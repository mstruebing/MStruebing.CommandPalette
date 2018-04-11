import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@neos-project/react-ui-components';
import {connect} from 'react-redux';
import {actions} from '@neos-project/neos-ui-redux-store';
import {$transform, $get} from 'plow-js';

@connect(
    $transform({
        previewUrl: $get('ui.contentCanvas.previewUrl')
    }), {
        toggleFullScreen: actions.UI.FullScreen.toggle,
        toggleLeftSideBar: actions.UI.LeftSideBar.toggle,
        toggleRightSideBar: actions.UI.RightSideBar.toggle
    }
)
export default class CommandPalette extends PureComponent {
    static propTypes = {
        toggleFullScreen: PropTypes.func,
        toggleLeftSideBar: PropTypes.func,
        toggleRightSideBar: PropTypes.func,
        previewUrl: PropTypes.string,
        searchTerm: PropTypes.string,
        close: PropTypes.func.isRequired
    };

    state = {
        searchTerm: ''
    };

    shortcuts = [
        {
            label: "Toggle FullScreen",
            action: this.props.toggleFullScreen,
            icon: 'arrow-right'
        },
        {
            label: "Toggle LeftSideBar",
            action: this.props.toggleLeftSideBar,
            icon: 'arrow-right'
        },
        {
            label: "Toggle RightSideBar",
            action: this.props.toggleRightSideBar,
            icon: 'arrow-right'
        },
        {
            label: "Open Preview",
            action: () => window.open(this.props.previewUrl, "blank"),
            icon: 'arrow-right'
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        };
    }

    onUpdateSearchTerm = (searchTerm = '') => {
        this.setState({
            searchTerm
        });
    }

    onValueChange = value => {
        if (typeof(value) !== 'function') {
            console.error('The value isnt a function!');
        }

        value();
        this.reset();
    }

    reset = () => {
        this.props.close();
        this.onUpdateSearchTerm();
    }

    render() {
        const shortcuts = this.shortcuts.map(shortcut => ({
            label: shortcut.label,
            value: shortcut.action,
            icon: shortcut.icon
        }));

        // not exposed internally :(
        const searchOptions = (searchTerm, processedSelectBoxOptions) =>
            processedSelectBoxOptions.filter(option => option.label && option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

        return (
            <SelectBox
                placeholder={'What do you want to do?'}
                placeholderIcon={'filter'}
                onValueChange={this.onValueChange}
                allowEmpty={true}
                value={null}
                options={searchOptions(this.state.searchTerm, shortcuts)}
                displaySearchBox={true}
                searchTerm={this.state.searchTerm}
                onSearchTermChange={this.onUpdateSearchTerm}
                threshold={-1}
                noMatchesFoundLabel={"No Command found"}
                setFocus={true}
                />);
    }
}
