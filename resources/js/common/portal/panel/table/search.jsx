//calling the api call and pagination here
import React from "react";

import Table from '../../';
export  default class SearchTable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
    }

    componentDidMount() {

    }
    render() {
        return (

            

            <div style={STYLES.paginationContainer}>

            {/*Rows Per Page AKA: Take*/}
            <FlexContainer style={STYLES.paginationTakeContainer}>
                <div style={STYLES.rowsPerContainer}>
                    <span>Rows Per Page</span>
                    <Select
                        stylescontainer={STYLES.paginationTakeSelectContainer}
                        stylesselect={STYLES.paginationTakeSelect}
                        color='#aaa'
                        options={OPTIONS_TAKE}
                        value={this.props.take}
                        onChange={e => this.props.onTake(e.target.value)}
                    />
                </div>
                <div>{rangeLow}-{rangeHigh} of {this.props.count}</div>

                {/* Pages and next prev */}
                <div style={STYLES.paginationNextPrevContainer}>
                    {
                        showPrevPage ?
                            <StyledComponent
                                tagName='div'
                                style={STYLES.paginationCaret}
                                styleHover={STYLES.paginationCaretHover}
                                props={{
                                    onClick: () => this.props.onPage(this.props.page - 1)
                                }}
                            >
                                <i className='fa fa-chevron-left' />
                            </StyledComponent> : <div
                                style={STYLES.paginationCaret}
                            />
                    }
                    {
                        showNextPage ?
                            <StyledComponent
                                tagName='div'
                                style={STYLES.paginationCaret}
                                styleHover={STYLES.paginationCaretHover}
                                props={{
                                    onClick: () => this.props.onPage(this.props.page + 1)
                                }}
                            >
                                <i className='fa fa-chevron-right' />
                            </StyledComponent> : <div
                                style={STYLES.paginationCaret}
                            />
                    }
                </div>
            </FlexContainer>
            </div>

        )
    }
}
