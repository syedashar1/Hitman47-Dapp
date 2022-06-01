import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Meme from '../abis/Hitman47.json'
import Market from '../abis/Market.json'
import Web3 from 'web3';
import AdminSide from './AdminSide';
import SingleCard from './SingleCard';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      contract2: null,
      web3: null,
      buffer: null,
      account: null ,
      totalSupplyState : null,
      agentsID : [],
      owner : null ,
      TokenCredit : null ,
      accountEth : null ,
      ownedNFTs : null ,
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    const networkData2 = Market.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address)
      this.setState({ contract }) //contract.address
      const owner = await contract.methods.owner().call()
      console.log(contract._address);
      const totalSupply = await contract.methods.totalSupplyy().call()
      this.setState({ totalSupplyState : totalSupply })
      this.setState({ owner })
      web3.eth.getBalance(this.state.account).then(x=>this.setState({accountEth:x}))
      contract.methods.balanceOf(this.state.account).call().then(x=>this.setState({ownedNFTs:x}))

      for (var i = 1; i <= totalSupply; i++) {
        this.setState({
          agentsID: [...this.state.agentsID, i]
        })
      }
      
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }

    if(networkData2){
      const contract2 = new web3.eth.Contract(Market.abi, networkData2.address)
      this.setState({ contract2 })
    } else {
      window.alert('Smart contract 2 not deployed to detected network.')
    }

  }



  render() {
    return (
      <div>
      
        <Navbar account={this.state.account} TokenCredit={this.state.TokenCredit} ownedNFTs={this.state.ownedNFTs} accountEth={this.state.accountEth}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                
                {this.state.account && <AdminSide contract2={this.state.contract2} contract={this.state.contract} account={this.state.account} />}
                {this.state.totalSupplyState && this.state.agentsID.map(x=> 
                  <SingleCard contract={this.state.contract} id={x} account={this.state.account} owner={this.state.owner} /> ) 
                }

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
