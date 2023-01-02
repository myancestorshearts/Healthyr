//calling the api call and pagination here
import React from "react";
import ApiAdmin from '../../../api/admin'
import Table from '../../panel/table/index';
import FlexContainer from "../../../components/flex-container";
import Button from "../../../inputs/button";


const OPTIONS_TAKE = [
    {
        label: '10',
        value: 10
    },
    {
        label: '25',
        value: 25
    },
    {
        label: '50',
        value: 50
    },
    {
        label: '100',
        value: 100
    }
]

export  default class SearchTable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            models: [],
            page: 1,
            pageCount: 1
            
        }
        this.handlePaginate = this.handlePaginate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch() {
        ApiAdmin.Generic.search({classkey: this.props.classkey, page: this.state.page, take: 25, include_meta: true}, success => {
            this.setState({
                models: success.data.models,
                pageCount: success.data.page_count
                
            })
          })
    }

    handlePaginate(page) {
        this.setState({page: page}, this.handleSearch) 
    }

    render() {

        const pageNumbers = [];


        pageNumbers.push(1);

        if (this.state.page > 4) pageNumbers.push(<a>...</a>);

        for (let i = this.state.page - 2; i <= this.state.page + 2; i++) {
            if (i > 1&& i < this.state.pageCount) pageNumbers.push(i)
        }

        if (this.state.page < this.state.pageCount - 3) pageNumbers.push(<a>...</a>)

        if (this.state.pageCount > 1) pageNumbers.push(this.state.pageCount);
        
        return (

                
             <React.Fragment>
                    <Table
                    properties={this.props.properties}
                    models={this.state.models} 
                    onSelectModel = {this.props.onSelectModel}
                    />
                
                    <div style={STYLES.pageContainer}>

                        {this.state.page > 1 ?
                            <button
                                stylesbuttonhover={STYLES.balanceButtonHover}
                                stylesbuttonactive={STYLES.balanceButtonActive}
                                className="fa fa-angle-left" style={STYLES.iconArrow}
                                onClick={() => {
                                    this.handlePaginate(this.state.page - 1);
                                } } /> : null}

                        {pageNumbers.map((number, i) => (
                            <Button
                                key={i}
                                stylesbuttonhover={STYLES.balanceButtonHover}
                                stylesbuttonactive={STYLES.balanceButtonActive}
                                active={number == this.state.page}
                                stylesbutton={STYLES.listNumbers}
                                props={{
                                    onClick: () => {
                                        if (!isNaN(number))
                                            this.handlePaginate(number);
                                    }
                                }}>
                                {number}

                            </Button>
                        ))}
                        {this.state.page < this.state.pageCount - 1 ?
                            <button
                                stylesbuttonhover={STYLES.balanceButtonHover}
                                className="fa fa-angle-right" style={STYLES.iconArrow}
                                onClick={() => this.handlePaginate(this.state.page + 1)} /> : null}
                    </div>

               </React.Fragment>
                    
                 
                

        )
    }
}

const STYLES = {
    

    pageContainer: {
        margin: '0px',
        listStyleType: 'none',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    listNumbers: {
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '5px',
        textDecoration: 'none',
        color: 'grey',
        fontFamily: 'Poppins',
        fontSize: '14px',
        width: '40px',
        marginBottom: '0px',
        border: 'none'
    },
    iconArrow: {
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '20px',
        cursor: 'pointer'
    },

    balanceButtonHover: {
        backgroundColor: 'rgb(32, 20, 94)',
        borderRadius: '40px',
        
    },
    balanceButtonActive: {
        
        color: '#fffff'
    }

}