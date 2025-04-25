import React from 'react'

export default function Empty({size = 100}) {
  return (
    <div className="empty-container">
        <img src="/assets/empty.png" alt="" style={{width: size+"px"}} />
        <p>Oops! There is no data yet!</p>
    </div>
  )
}
