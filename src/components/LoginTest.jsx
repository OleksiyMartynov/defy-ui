import React, { Component } from "react";
import Account from "../models/Account";
import { updateAccount } from "../actions/account";
import { requestProvider } from 'webln';
import { connect } from 'react-redux';

class LoginTest extends Component {
    state = {account:false, sig:false, signedMessage:false, lnurl:false}
  async componentDidMount() {
    // const resp = await fetch(`${process.env.REACT_APP_API_URL}/login/login-lnurl`);
    // const respJson = await resp.json();
    // this.setState({lnurl:respJson})

    //check login
    const authResp = await fetch(`${process.env.REACT_APP_API_URL}/login/logged-in`);
    const authRespJson = await authResp.json();
    console.log(authRespJson)
  }

  async componentWillReceiveProps (newProps) {
    // console.log(newProps);
    // if(newProps.account){
    //     const account = new Account(newProps.account.mnemonic);
    //     const sig = await account.sign(account.getAddress());

    //     this.setState({account, sig})
    //     const webln = await requestProvider();
    //     if(webln){
    //       const signedMessage = await webln.signMessage(account.getAddress());
    //       console.log(signedMessage)
    //       this.setState({signedMessage})
    //     }
        
    // }
    
  }

  render() {
      const {account, sig, signedMessage, lnurl} = this.state;
      console.log(account);
      console.log(account?.getAddress?.())
    return (
      <div>
        {/* <iframe width='500px' height="400px" src={`${process.env.REACT_APP_API_URL}/login/login-lnurl`} title="TestLNURL"></iframe> */}
    {lnurl&& <div>{JSON.stringify(lnurl)}</div>}
        <div>
        {account&&<form
          action={`${process.env.REACT_APP_API_URL}/login/login-custom`}
          method="post"
        >
          <div>
            <label>Username:</label>
            {/* <input value={`webln,${account.getAddress()},${sig.message}`} type="text" name="payload" /> */}
            <input value={`webln,${account.getAddress()},${signedMessage.message}`} type="text" name="payload" />
          </div>
          <div>
            <label>Password:</label>
            {/* <input value={sig.signature} name="signature" /> */}
            <input value={signedMessage.signature} name="signature" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  account: state.account,
});
export default connect(mapStateToProps, null)(LoginTest);
