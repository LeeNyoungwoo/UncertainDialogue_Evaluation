import React, { Component } from 'react';
import Message from "./Message"

export default class MessageList extends Component {

    render() {
        const { chatData, data_idx, top1_mode } = this.props;
        const max_idx = parseInt(chatData[data_idx]['max_idx']);
        const max_score = chatData[data_idx]['max_score'];
        const target_img = chatData[data_idx]['target_img'];

        // render whole messages during conversation
        const messages = chatData[data_idx]['text'].map(
            (content, i) => (
                <div key={i}>
                    { (i === chatData[data_idx]['text'].length - 1) && top1_mode === 0
                        ?   null
                        :   (i % 2) === 0
                            ?   <Message
                                    id={i}
                                    type={true}
                                    text={content}
                                    target_img = { max_idx !== i
                                        ?   null
                                        :   target_img
                                    }
                                    top1_mode = {top1_mode}
                                    top1_target = {max_idx === i}
                                    max_score={max_score}
                                    last_target = {i === chatData[data_idx]['text'].length - 1}
                                />
                            :   <Message
                                    id={i}
                                    type={false}
                                    text={content}
                                    target_img = { max_idx !== i
                                        ?   null
                                        :   target_img
                                    }
                                    top1_mode = {top1_mode}
                                    top1_target = {max_idx === i}
                                    max_score={max_score}
                                    last_target = {i === chatData[data_idx]['text'].length - 1}
                                />
                    }
                    
                </div>
            )
        );

        return (
            <div>
                {messages}
            </div>
        );
    }
}
