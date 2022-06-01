import React, { useState , useEffect} from 'react';
import Meme from '../abis/Hitman47.json'
import Market from '../abis/Market.json'
import Web3 from 'web3';
import Navbar from './Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Grid,TableContainer,Container,Table,Typography,TableHead,TableBody,TableRow,TableCell,CircularProgress,Button,Card,List,ListItem,Paper, TextField} from '@mui/material';

export default function BuyTokens() {
  
  const [first, setfirst] = useState( )
  const [costInTokens, setCostInTokens] = useState(null)
  const [URI, setURI] = useState(null)
  const [OwnedBy, setOwnedBy] = useState(null)
  const [OwnedHistory, setOwnedHistory] = useState([])
  const [totalOwners, settotalOwners] = useState(0)

  const [contract, setContract] = useState(null)
  const [memeHash, setMemeHash] = useState('')
  const [web3, setWeb3] = useState(null)
  const [buffer, setBuffer] = useState(null)
  const [account, setAccount] = useState(null)
  const [agentID, setAgentID] = useState(null)  
  const [owner, setOwner] = useState(null)
  const [valueInETH, setValueInETH] = useState(1)


  const loadWeb3 = async () => {
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



  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts() ; setAccount(accounts[0]) ;
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address) ; setContract(contract)
      const owner = await contract.methods.owner().call() ; setOwner(owner) ; 
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  const starter = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  useEffect(() => {
     starter()
  }, [])


  const buyHandler = () =>{
    contract.methods.buyToken().send({value : valueInETH*(10**18) , from : account }) ;
  }
  
  
  return (
    <div style={{margin:'50px 0px'}} >
    <Container>
      
      <TextField type='number' value={valueInETH} onChange={(e)=>setValueInETH(e.target.value)} />
      <Button onClick={buyHandler} > Buy Tokens </Button>

    </Container>
    </div>
  )
}
