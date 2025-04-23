import React from 'react'
import CloseButton from '../components/CloseButton'
import "../styles/search.css"
import SearchView from "./SearchView"
import SearchMenu from './SearchMenu'

export default function SearchLayout() {
  return (
<div id="rollbit-modal-popover-container">
    <div className="css-1yogdko">
        <div style={{width: "100%", cursor:"auto"}} className="css-13b27oz">
            <div className="css-38zi9d" width="1408">
                <div className="css-1nc5kzu">
                   <CloseButton />
                </div>
                
                <div className="css-av8uu6">
                    <div className="css-ojf8hg">
                        <SearchMenu />
                        <SearchView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
