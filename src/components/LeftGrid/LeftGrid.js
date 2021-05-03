import React from 'react';
import { Image } from 'semantic-ui-react'
import chatbot_img from './imageChat.png';
import './LeftGrid.css';

export default function LeftGrid() {
    return (
        <div className="leftGrid">
            <div className="leftGridImage">
                <Image style={{width: '15vh', height: 'auto'}} src={chatbot_img}/>
            </div>
            <div className="leftGridTag">
                Multi-Modal Dialogue
            </div>
            <div className="leftGridTag2">
                Evaluation System
            </div>
        </div>
    );
}
