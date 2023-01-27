//table view here
import React from 'react';
import Loading from '../../../components/loading';
import Panel from '../../panel/index';
import CommonBrand from '../../../brand'
import toastr from 'toastr';
import CommonFunctions from '../../../functions'
import StyledComponent from '../../../components/styled-component';

class Table extends React.Component {

    constructor(props) {
        super(props)
    }  

    render() {
    
        
        let rows = this.props.models.map(x => <Row
            key={x.id}
            model={x}
            properties={this.props.properties}
            onClick = {() => {
                if (this.props.onSelectModel) this.props.onSelectModel(x)
            }}
        />)
        return (
            
                    <div style={STYLES.tableContainer}>
                        <Loading loading={(this.props.loading) ? this.props.loading : false}>
                            <table
                                style={STYLES.table}
                                cellSpacing="0"
                            >
                                <thead>
                                    <HeaderComponent
                                        axis="x"
                                        properties={this.props.properties}
                                    />
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </Loading>
                    </div>
        )
    }
}

const GET_VALUE = (model, property) => {
    if (property.type == 'METHOD') return property.method(model)
    let value = CommonFunctions.deepGetFromString(model, property.property);
    if (CommonFunctions.isEmpty(value)) return '-';
    if (property.type == 'DATE') value = CommonFunctions.convertMysqlToDate(value).formatDate('n/d/y');
    else if (property.type == 'DATETIME') value = CommonFunctions.convertMysqlToDate(value).formatDate('n/d/y H:m A')
    else if (property.type == 'CURRENCY') value = CommonFunctions.convertToMoney(value);
    else if (property.type == 'ADDRESS') value = CommonFunctions.formatAddress(value);
    else if (property.type == 'BOOLEAN') value = CommonFunctions.inputToBool(value) ? property.boolTrue : property.boolFalse;
    else if (property.type == 'WEIGHT') value += 'oz';
    else if (property.type == 'LENGTH') value += '"';
    return value;
}



const Row = (props) => {


    let cellStyles = { ...STYLES.tableRowCell }

    let columns = props.properties ? Object.keys(props.properties).map(key => {
        if (!props.properties[key]) return null;

        let contents = GET_VALUE(props.model, props.properties[key])
        if (props.properties[key].type == 'LINK') {
            contents = (<a href='#' onClick={(e) => {
                window.open(props.properties[key].linkMethod(props.model), '_blank')
                e.stopPropagation();
            }}> {contents}</a>);
        }
        return (
            <td
                style={cellStyles}
                key={key}
            >
                {contents}
            </td>
        )
    }) : null

    return (
        
        <StyledComponent
        props={{onClick: props.onClick}}
         tagName='tr'
         styleHover={STYLES.rowHover}
         style={STYLES.row}
        >
       

        {columns}
        
           
        </StyledComponent>
        
    )

}

const HeaderComponent = (props) => {

    let headers = (props.properties) ? Object.keys(props.properties).map((key, index) => {
        if (!props.properties[key]) return null;
        return <HeaderTitle
            onSort={() => {
                if (props.onSort) props.onSort(props.properties[key])
            }}
            key={key}
            index={index}
            title={props.properties[key].title}
            sort={props.sort}
        />
    }) : null

    return (
        <tr>
            {headers}
        </tr>
    )
}

const HeaderTitle = (props) => {

    let carat = undefined;
    if (props.sortableColumn && props.sort.column == props.sortableColumn) {
        let caretDirection = props.sort.direction == 'ASC' ? 'fa fa-caret-down' : 'fa fa-caret-up';
        carat = <i className={caretDirection} style={STYLES.tableHeaderIcon} />
    }

    return (
        <th
            
            style={STYLES.tableHeader}
            onClick={props.sortableColumn ? props.onSort : () => toastr.warning('Unable to sort by ' + props.title)}
        >
            {props.title} {carat}
        </th>
    )
}


export default Table;

const STYLES = {
   
    tableContainer: {
        width: '100%',
        overflowY: 'auto',
        background: '#ffffff',
        borderRadius: '20px',
        paddingTop: '10px'
    },
    table: {
        width: '100%',
        textAlign: 'center',
        cellspacing: 0, 
    },
    tableHeader: {
        paddingLeft: '5px',
        paddingRight: '5px',
        color: '#aaa',
        borderBottom: '2px solid #f1f4f9',
        paddingBottom: '10px',
        fontSize: '12px',
        cursor: 'pointer',
        userSelect: 'none'
    },
    tableHeaderIcon: {
        fontSize: '14px',
    },
    tableRowCell: {
        padding: '6px',
        borderBottom: '1px solid #f1f4f9',
        fontWeight: 'bold',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '12px',
        
   },
    loading: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    rowHover:{
        backgroundColor: CommonBrand.getActiveColor(),
        color: 'white',
        cursor: 'pointer'
    },
    row: {
        color: '#555'
    }
}
