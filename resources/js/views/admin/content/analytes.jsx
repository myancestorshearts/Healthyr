import React from 'react'
import FlexContainer from '../../../common/components/flex-container'
import InputSelectModel from '../../../common/inputs/select-model'
import PortalPanelTotal from '../../../common/portal/panel/total'
import PortalTitle from '../../../common/portal/title'
import TableSearch from '../../../common/portal/panel/table/search'
import SidePanel from '../../../common/portal/panel/side-panel'
import CommonBrand from '../../../common/brand'
import Analyte from '../../../common/models/analyte/index'
import FlexExpander from '../../../common/components/flex-expander';
import AddAnalyte from '../../../common/portal/content/forms/add-analyte'


const FILTER_TIME_FRAME = [
  {
    name: 'Week To Date',
    id: 'WEEK',
  },
  {
    name: 'Month To Date',
    id: 'MONTH',
  },
  {
    name: 'Year To Date',
    id: 'YEAR',
  },
]

const FILTER_FULFILLED = [
  {
    name: 'Fulfilled',
    id: 'FULFILLED',
  },
  {
    name: 'Unfulfilled',
    id: 'UNFULFILLED',
  },
]

const VIEW_DASHBOARD = 'dashboard'
const VIEW_TABLE = 'table'

export default class Analytes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterTimeFrame: FILTER_TIME_FRAME[0],
      filterFulfilled: FILTER_FULFILLED[0],
      view: VIEW_DASHBOARD,
    }
    this.handleSelectModel = this.handleSelectModel.bind(this)
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleSelectModel(x) { 
    SidePanel.pushStart('Analyte Details', 
       <Analyte
        model={x}
        onSave={() => {
          SidePanel.pop();
          if (this.table) this.table.handleSearch();
        }}
       />
    )
  }

  handleAdd() {
     SidePanel.pushStart( 'Add Analyte',
      <AddAnalyte 
        onAdd={() => {
          SidePanel.pop();
          if (this.table) this.table.handleSearch();
        }}
      />

     )
  }

  render() {
    return (
      <FlexContainer gap="20px">
        <PortalTitle title="Analytes" />

        <FlexContainer gap="10px">
          <i
            style={{
              ...STYLES.iconFilter,
              ...(this.state.view == VIEW_DASHBOARD
                ? STYLES.iconFilterActive
                : {}),
            }}
            className="fa fa-dashboard"
            onClick={() => this.setState({ view: VIEW_DASHBOARD })}
          />
          <i
            style={{
              ...STYLES.iconFilter,
              ...(this.state.view == VIEW_TABLE ? STYLES.iconFilterActive : {}),
            }}
            className="fa fa-list"
            onClick={() => this.setState({ view: VIEW_TABLE })}
          />
          {/*<i style={STYLES.iconFilter} className='fa fa-download' />*/}
          <InputSelectModel
            models={FILTER_TIME_FRAME}
            value={this.state.filterTimeFrame}
            onChange={(x) => this.setState({ filterTimeFrame: x })}
            stylesselect={STYLES.selectInput}
            stylescontainer={STYLES.selectContainer}
          />
          {this.state.view == VIEW_TABLE ? (
            <InputSelectModel
              models={FILTER_FULFILLED}
              value={this.state.filterFulfilled}
              onChange={(x) => this.setState({ filterFulfilled: x })}
              stylesselect={STYLES.selectInput}
              stylescontainer={STYLES.selectContainer}
            />
          ) : null
          
          }
         <FlexExpander />
          <button style={STYLES.buttonCreate} onClick={this.handleAdd}>
						<i className="fa fa-plus" style={STYLES.createInputIcon}></i>
						Add Analytes
					</button>
        </FlexContainer>
        

        {this.state.view == VIEW_DASHBOARD ? (
          <React.Fragment>
            <PortalPanelTotal title="Resulted" value="10" />
            <PortalPanelTotal title="Low" value="10" />

            <PortalPanelTotal title="Healthy" value="16" />

            <PortalPanelTotal title="High" value="80%" />
          </React.Fragment>
        ) : null}
        {this.state.view == VIEW_TABLE ? (
          <TableSearch
            classkey='analyte'
            ref={(e) => (this.table = e)}
            properties={{
              key: {
                title: 'Key',
                property: 'key',
                type: 'TEXT',
                default: true,
              },
              name: {
                title: 'Name',
                property: 'name',
                type: 'TEXT',
                default: true,
              },
              unit: {
                title: 'Unit of Measure',
                property: 'unit_of_measure',
                type: 'TEXT',
                default: true,
              },
              description: {
                title: 'Description',
                property: 'description',
                type: 'TEXT',
                default: true
              }
            }}
            onSelectModel={this.handleSelectModel}
            
          />
          
        ) : null}
       
      </FlexContainer>
    )
  }
}

const STYLES = {
  /*  totalPanelContainer: {
          flex: 1,
          minWidth: '300px',
          textAlign: 'center'
      },
      totalValue: {
          fontSize: '50px',
          color: CommonBrand.getSecondaryColor()
      },*/
  filterContainer: {
    width: '100%',
  },
  selectInput: {
    height: '50px',
    fontSize: '20px',
    textAlign: 'center',
    border: 'none',
  },
  selectContainer: {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '20px',
    maxWidth: '200px',
    paddingRight: '20px',
  },
  iconFilter: {
    padding: '13px',
    backgroundColor: 'white',
    borderRadius: '20px',
    fontSize: '20px',
    cursor: 'pointer',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'white',
  },
  iconFilterActive: {
    backgroundColor: CommonBrand.getSecondaryColor(),
    color: 'white',
  },
  buttonCreate: {
		paddingRight: '20px',
    paddingLeft: '20px',
		height: '50px',
		backgroundColor: CommonBrand.getSecondaryColor(),
		border: 'none',
		borderRadius: '20px',
		boxShadow: 'rgb(180 204 222 / 20%) 5px 5px 10px',
		color: '#ffffff',
		fontWeight: 20,
		fontSize: '18px',
		fontFamily: 'Poppins',
    cursor: 'pointer'
	},
	createInputIcon: {
		paddingRight: '10px'
	}
}
