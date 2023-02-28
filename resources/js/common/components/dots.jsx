import React from "react";
import { CONFIRM } from '../components/modal/index';
import ApiAdmin from '../api/admin'
import toastr from "toastr";

export default  class SelectionBox extends  React.Component {
    constructor(props) {
        super(props)
        this.state ={
            loading: true,
            open: false
        }
        
        this.handleSelect = this.handleSelect.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDuplicate = this.handleDuplicate.bind(this)
    }

    handleSelect(e){
        e.stopPropagation()
        this.setState({open: !this.state.open})
       
    }

    handleDelete() {
    
        ApiAdmin.Generic.delete({
          classkey: this.props.classKey, id: this.props.model.id
        }, () => { 
          toastr.success('Analyte Successfully Deleted')
          if(this.props.onDelete) this.props.onDelete()
        }, failure => {
          toastr.error(failure.message);
        }
        )
    }

    handleDuplicate() {
    
        let duplicate = {...this.props.model}
        delete duplicate.id
        
        ApiAdmin.Generic.add({
          classkey: this.props.classKey, ...duplicate
        }, () => {
          toastr.success('Analyte Successfully Duplicated')
          if(this.props.onDelete) this.props.onDelete()
        }, failure => {
          toastr.error(failure.message);
        }
    
        )
      }

    render() {

       
        let selectStyles = { ...STYLES.select };
        let labelStyles = { ...STYLES.label };
        let containerStyles = { ...STYLES.container }

        let color = this.props.color ? this.props.color : 'black';
        if (this.props.color) {
            selectStyles.borderColor = color;
            selectStyles.color = color;
            labelStyles.color = color;
        }

        selectStyles = { ...selectStyles, ...(this.props.stylesselect ? this.props.stylesselect : {}) };
        labelStyles = { ...labelStyles, ...(this.props.styleslabel ? this.props.styleslabel : {}) };
        containerStyles = { ...containerStyles, ...(this.props.stylescontainer ? this.props.stylescontainer : {}) };

        

        return (
            <div style={containerStyles} onClick={this.handleSelect}>
              <i 
                className="fa fa-ellipsis-h" 
                style={STYLES.dot}
                >
                {this.state.open ? 
                <div style={STYLES.ellipsisOpt}>
                <option style={STYLES.optButton}  onClick={(e) => {
                    e.stopPropagation();
                    CONFIRM('Are you sure you want to cancel this?', () => this.handleDelete())
                }}>
                Delete
                </option>
                
                 <option style={STYLES.optButton} onClick={this.handleDuplicate}>Duplicate</option>
                 
                </div>
                : null}
                </i>
            
            </div>
        )
    }
}

const STYLES = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        
    },
    select: {
        backgroundColor: 'transparent',
        height: '30px',
        borderRadius: '5px',
        border: '2px solid',
        paddingLeft: '6px',
        paddingRight: '6px',
        fontSize: '16px',
        minHeight: '36px',
        fontWieght: 'bold',
        cursor: 'pointer'
    },
    label: {
        marginBottom: '2px',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    dot: {
      
       paddingRight: '20px',
       paddingLeft: '20px',
       

    },
    ellipsisOpt: {
        margin: '15px',
        padding: '15px',
        minWidth: '60px',
        overflowX: 'hidden',
        zIndex: 3,
        top: 'auto',
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid rgb(245 248 250/ 100%',
        position:'fixed',
        right: '-10px',
        boxShadow: 'rgb(245 248 250/ 100%) 5px 5px 5px '
       

    },
    optButton: {
        padding: '15px'
    }
}
