import React from 'react';

import './VideoPlayer.css';

class VideoPlayer extends React.Component {
  
  render () {
    return (
      <div class="video-controls" id="video-controls">
        <video controls class="video" id="video" preload="metadata" poster="poster.jpg">
          <source src="/video.mp4" type="video/mp4"></source>
        </video>
      </div>
    )
  }
}

export default VideoPlayer;
