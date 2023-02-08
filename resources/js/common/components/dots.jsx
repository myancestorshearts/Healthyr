import React from "react";


const OPTIONS = [
    'Delete',
    'Duplicate'
]

export default  class SelectionBox extends  React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: true,
                open: false
            }
            this.toggleDropdown = this.toggleDropdown.bind(this)
        }

        toggleDropdown() {
            this.setState({ open: !this.state.open })
        }

        render() {
            return(
                <div>
                  
                       <i 
                       className="fa fa-ellipsis-v"
                       key={OPTIONS}
                       onClick={this.toggleDropdown}
                      />
                    
                </div>
            )
        }
}
