import React from 'react';
import PropTypes from 'prop-types';

export class TabPane extends React.Component {
    // static propTypes = {
    //     activeTab: PropTypes.string.isRequired,
    //     tabName: PropTypes.string.isRequired,
    //     onClick: PropTypes.func.isRequired,
    // };

    onClick = () => {
        const { tabName, onClick } = this.props;
        onClick(tabName);
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                tabName,
            },
        } = this;

        let className = '';

        if (activeTab === tabName) {
            className += ' active';
        }

        return (
            <li
                className={className}
                onClick={onClick}
            >
                <a>
                    <h6>{tabName}</h6>
                </a>
            </li>
        );
    }
}

export class Tabs extends React.Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.tabName,
        };
        this.onClickTabItem = this.onClickTabItem.bind(this);
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
                className
            },
            state: {
                activeTab,
            }
        } = this;
        return (
            <div className={!className?"tabbable": className}>
                <ul className="nav nav-tabs nav-justified">
                    {children.map((child) => {
                        const { tabName } = child.props;
                        return (
                            <TabPane
                                activeTab={activeTab}
                                key={tabName}
                                tabName={tabName}
                                onClick={onClickTabItem}
                            />
                        );
                    })}
                </ul>
                <div className="tab-content panel-body">
                    {children.map((child, index) => {
                        let className = "tab-pane"
                        if (child.props.tabName === activeTab) className += " active";
                        return <div className={className} key={index}>{child.props.children}</div>;
                    })}
                </div>
            </div>
        );
    }
}
