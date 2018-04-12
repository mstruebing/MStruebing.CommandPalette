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

    commands = [
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
        const commands = this.commands.map(shortcut => ({
            label: shortcut.label,
            value: shortcut.action,
            icon:  shortcut.icon ? shortcut.icon : 'arrow-right'
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
                options={searchOptions(this.state.searchTerm, commands)}
                displaySearchBox={true}
                searchTerm={this.state.searchTerm}
                onSearchTermChange={this.onUpdateSearchTerm}
                threshold={-1}
                noMatchesFoundLabel={"No Command found"}
                setFocus={true}
                />);
    }
}
