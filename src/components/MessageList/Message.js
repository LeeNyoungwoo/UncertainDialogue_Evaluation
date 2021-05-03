import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import './Message.css';

export default class Message extends Component {
    render() {
        const { type, text, target_img, top1_mode, top1_target, last_target, max_score } = this.props;

        return (
            <div>
                {
                    (() => {
                        if (type === true)
                            return  (
                                    <div>
                                        {target_img
                                            ?   <div className={top1_mode===1 ? "messageSection_Img_t messageSectionBot" : "messageSection_Img messageSectionBot"}>
                                                    <span className="messageSectionImg">
                                                        <Image style={{width: '300px', height: 'auto'}} src={require(`../../store/modules/targetImages/${target_img}`)}/>
                                                    </span>
                                                </div>
                                            :   null
                                        }
                                        { (top1_mode === 1 && top1_target)
                                            ?   null
                                            :   <div className="messageSection messageSectionBot">
                                                    { last_target
                                                        ?   <span className={"messageSectionBody_last"}>{text}</span>
                                                        :   <span className={top1_target ? "messageSectionTarget" : "messageSectionBody"}>{text}</span>
                                                    }
                                                </div>
                                        }
                                    </div>
                                    );
                        if (type === false)
                            return (
                                <div>
                                    {target_img
                                        ?   <div className={top1_mode===1 ? "messageSection_Img_t messageSectionUser" : "messageSection_Img messageSectionUser"}>
                                                <span className="messageSectionImg">
                                                    <Image style={{width: '15vw', height: 'auto'}} src={require(`../../store/modules/targetImages/${target_img}`)}/>
                                                </span>
                                            </div>
                                        :   null
                                    }
                                    { (top1_mode === 1 && top1_target)
                                            ?   null
                                            :   <div className="messageSection messageSectionUser">
                                                    <div className="messageSectionCenter">
                                                        { last_target
                                                            ?   <span className={"messageSectionBody_last"}>{text}</span>
                                                            :   <span className={top1_target ? "messageSectionTarget" : "messageSectionBody"}>{text}</span>
                                                        }
                                                    </div>
                                                </div>
                                    }
                                </div>
                                );
                    })()
                }
            </div>
        );
    }
}