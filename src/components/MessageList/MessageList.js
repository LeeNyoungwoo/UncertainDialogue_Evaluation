import React, { Component } from 'react';
import Message from "./Message"

export default class MessageList extends Component {

    render() {
        const { chatData, data_idx } = this.props;

        // render whole messages during conversation
        const messages = chatData[data_idx]['context'].map(
            (content, i) => (
                <div key={i}>
                    { (i % 2) === 0
                        ?   <Message
                                id={i}
                                type={true}
                                text={content}
                            />
                        :   <Message
                                id={i}
                                type={false}
                                text={content}
                            />
                    }
                </div>
            )
        );

        return (
            <div>
                {messages}
                { (chatData[data_idx]['context'].length % 2) === 0
                    ?   <Message
                            type={true}
                            text={'?'}
                            last_target={true}
                        />
                    :   <Message
                            type={false}
                            text={'?'}
                            last_target={true}
                        />
                }
            </div>
        );
    }
}
