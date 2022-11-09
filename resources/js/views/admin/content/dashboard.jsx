import React from 'react'

import PortalPanelTotal from '../../../common/portal/panel/total'

import FlexContainer from '../../../common/components/flex-container'

import PortalTitle from '../../../common/portal/title'

import InputSelectModel from '../../../common/inputs/select-model'

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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterTimeFrame: FILTER_TIME_FRAME[0],
    }
  }

  render() {
    return (
      <FlexContainer gap="20px">
        <PortalTitle title="Dashboard" />

        <div style={STYLES.filterContainer}>
          <InputSelectModel
            models={FILTER_TIME_FRAME}
            value={this.state.filterTimeFrame}
            onChange={(x) => this.setState({ filterTimeFrame: x })}
            stylesselect={STYLES.selectInput}
            stylescontainer={STYLES.selectContainer}
          />
        </div>

        <PortalPanelTotal title="New Clients" value="300" />
        <PortalPanelTotal title="Registered Tests" value="50" />
      </FlexContainer>
    )
  }
}

const STYLES = {
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
}
