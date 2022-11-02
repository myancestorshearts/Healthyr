import React from 'react';
import CommonApiAuth from '../../../common/api/auth';
import Text from '../../../common/inputs/text';
import Button from '../../../common/inputs/button';
import toastr from 'toastr';
import Functions from '../../../common/functions';
import CommonBrand from '../../../common/brand';

export default class Set extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordConfirm: '',
            password: ''
        }
        this.handleSetPassword = this.handleSetPassword.bind(this)
    }

    handleSetPassword(e) {
        e.preventDefault();
        if (this.state.password != this.state.passwordConfirm) {
            toastr.warning('Passwords do not match');
            return;
        }
        let queryParams = Functions.getQueryParams();
        let args = { ...this.state, key: queryParams.key }
        CommonApiAuth.Authenticate.passwordSet(args, success => {
            toastr.success('Set password successfully');
            this.props.history.push('/?email=' + encodeURI(queryParams.email))
        }, failure => {
            toastr.error(failure.message);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSetPassword}>

                <div style={STYLES.text}>
                    Welcome from Shopify.<br />Enter a password to create an account.
                </div>
                <Text
                    stylescontainer={STYLES.inputContainer}
                    styleslabel={STYLES.inputLabel}
                    stylesinput={STYLES.inputText}
                    title='Password'
                    autoComplete='password'
                    type='password'
                    onChange={e => this.setState({ password: e.target.value })}
                    value={this.state.password}
                />
                <Text
                    stylescontainer={STYLES.inputContainer}
                    styleslabel={STYLES.inputLabel}
                    stylesinput={STYLES.inputText}
                    title='Confirm Password'
                    autoComplete='confirm-password'
                    type='password'
                    onChange={e => this.setState({ passwordConfirm: e.target.value })}
                    value={this.state.passwordConfirm}
                />
                <Button
                    stylesbuttonhover={STYLES.buttonHover}
                    stylesbutton={STYLES.button}
                    props={{ type: 'submit' }}
                    color='white'
                >
                    Set Password
                </Button>
            </form>
        )
    }
}
const STYLES = {
    text: {
        color: 'black',
        fontSize: '20px',
        textAlign: 'center',
        fontFamily: 'poppins',
        fontWeight: '600'
    },
    inputText: {
        fontSize: '18px',
        borderColor: CommonBrand.getPrimaryColor(),
        borderRadius: '15px',
        height: '40px',
        fontWeight: '600',
        backgroundColor: 'white',
        fontFamily: 'poppins'
    },
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
        marginBottom: '20px',
        fontFamily: 'poppins'

    },
}
