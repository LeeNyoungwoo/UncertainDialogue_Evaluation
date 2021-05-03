import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
    render() {
        const { type, text, last_target } = this.props;

        return (
            <div>
                {
                    (() => {
                        if (type === true)
                            return  (
                                    <div>
                                        <div className="messageSection messageSectionBot">
                                            { last_target
                                                ?   <span className={"messageSectionTarget"}>{text}</span>
                                                :   <span className={"messageSectionBody"}>{text}</span>
                                            }
                                        </div>
                                    </div>
                                    );
                        if (type === false)
                            return (
                                <div>
                                    <div className="messageSection messageSectionUser">
                                        <div className="messageSectionCenter">
                                            { last_target
                                                ?   <span className={"messageSectionTarget"}>{text}</span>
                                                :   <span className={"messageSectionBody"}>{text}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                );
                    })()
                }
            </div>
        );
    }
}