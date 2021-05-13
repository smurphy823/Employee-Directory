import React from "react"

function Search (props) {
    return(
        <div>
            <form>
                <input type = "search" onChange = {event => props.handleSearch(event)}/>
            </form>
        </div>
    )
}

export default Search