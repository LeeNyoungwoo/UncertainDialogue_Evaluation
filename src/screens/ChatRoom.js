import React from 'react'

import LeftGrid from "../components/LeftGrid/LeftGrid"
import ChatGridContainer from "../containers/ChatGridContainer.js"
import RightGridContainer from "../containers/RightGridContainer.js"

export default function ChatRoom() {
    return (
      <div>
        <LeftGrid />
        <ChatGridContainer />
        <RightGridContainer />
      </div>
    );
}