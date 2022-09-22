import React from 'react'
import {Blocks} from "react-loader-spinner"
import "./Loading.css"

function Loading() {
  return (
    <div className="loading-wrapper">
      <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" />
    </div>
  )
}

export default Loading
