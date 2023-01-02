import React from "react";
import TableSearch from '../../../common/portal/panel/table/search'


//const VIEW_DASHBOARD = 'dashboard'
const VIEW_TABLE = 'table'

export default class Advertisement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
           
            <TableSearch
                classkey='advertisment'
                ref={(e) => (this.table = e)}
                properties={{
                id: {
                    title: 'Id',
                    property: 'id',
                    type: 'TEXT',
                    default: true,
                },
                type: {
                    title: 'Type',
                    property: 'type',
                    type: 'TEXT',
                    default: true,
                },
                name: {
                    title: 'Title',
                    property: 'title',
                    type: 'TEXT',
                    default: true,
                },
                unit: {
                    title: 'Description',
                    property: 'description',
                    type: 'TEXT',
                    default: true,
                },
                description: {
                    title: 'Link Text',
                    property: 'link_text',
                    type: 'TEXT',
                    default: true
                },
                imgfile: {
                    title: 'Image File Id',
                    property: 'image_file_id',
                    type: 'TEXT',
                    default: true
                },
                active: {
                    title: 'Active',
                    property: 'active',
                    type: 'TEXT',
                    default: true
                }

            }}
            onSelectModel={this.handleSelectModel}
          />
          
      
        )
    }
}