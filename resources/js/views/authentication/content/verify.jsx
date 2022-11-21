import React from 'react';
import Button from '../../../common/inputs/button';
import Functions from '../../../common/functions';
import CommonBrand from '../../../common/brand';
import toastr from 'toastr';
import ApiAuth from '../../../common/api/auth'

export default class Verify extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            verified: false,
            errorMessage: ''
        }

        this.handleProceedToLogin = this.handleProceedToLogin.bind(this);
    }

    componentDidMount() {
        let queryParams = Functions.getQueryParams();
        let args = { ...this.state, key: queryParams.key }
     
        // this is where we will want the verify email request
        ApiAuth.Authenticate.verifyEmail(args, success => {
            this.setState({verified: true})
        }, failure => {
            this.setState({errorMessage: failure.message + ' - Verification failed. Please contact support'});
        })
    }

    handleProceedToLogin(e) {
        e.preventDefault()
        this.props.history.push('/');
    }

    render() {
        if (!this.state.verified) {
            return (
                <div style={STYLES.text}>
                    {this.state.errorMessage}
                </div>
            )
        }

        return (
            <form onSubmit={this.handleProceedToLogin}>
                <div style={STYLES.text}>
                    Thank You. Your email has been verified!
                </div>
                <Button
                    stylesbuttonhover={STYLES.buttonHover}
                    stylesbutton={STYLES.button}
                    props={{ type: 'submit' }}
                    color='white'
                >
                    Login
                </Button>
            </form>
        )
    }
}

const STYLES = {
    inputLabel: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'black',
        fontFamily: 'poppins'
    },
    buttonHover: {
        backgroundColor: CommonBrand.getPrimaryHoverColor(),
        color: 'white'
    },
    button: {
        backgroundColor: CommonBrand.getPrimaryColor(),
        borderRadius: '15px',
        height: '40px',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px'

    },
    text: {
        color: 'black',
        fontSize: '20px',
        textAlign: 'center',
        fontFamily: 'poppins'
    }
}

