import React, { useState , useEffect} from 'react';
import Meme from '../abis/Hitman47.json'
import Market from '../abis/Market.json'
import Web3 from 'web3';
import Navbar from './Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Grid,TableContainer,Container,Table,Typography,TableHead,TableBody,TableRow,TableCell,CircularProgress,Button,Card,List,ListItem,Paper} from '@mui/material';

export default function AgentScreen() {
  
  const [first, setfirst] = useState( )
  const [costInTokens, setCostInTokens] = useState(null)
  const [URI, setURI] = useState(null)
  const [OwnedBy, setOwnedBy] = useState(null)
  const [OwnedHistory, setOwnedHistory] = useState([])
  const [totalOwners, settotalOwners] = useState(0)
  const [MarketContract, setMarketContract] = useState(null)

  const [contract, setContract] = useState(null)
  const [memeHash, setMemeHash] = useState('')
  const [web3, setWeb3] = useState(null)
  const [buffer, setBuffer] = useState(null)
  const [account, setAccount] = useState(null)
  const [agentID, setAgentID] = useState(null)  
  const [owner, setOwner] = useState(null)
  const params = useParams();
  const { idStr } = params;
  const id = parseInt(idStr) ;


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
    const networkData2 = Market.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address) ; setContract(contract)
      const owner = await contract.methods.owner().call() ; setOwner(owner) ; 
      
      const x = await contract.methods.ownerOf(id).call() ; setOwnedBy(x);
      const y = await contract.methods.tokenURI(id).call() ; setURI(y);

  
      // const n = await contract.methods.totalOwners(id).call() ; settotalOwners(n);
      
      // let temp ;
      // for (let i = 1; i <= n ; i++){
      //   temp = await contract.methods.ownedHistory(id,i).call()
      //   console.log(temp);
      //   setOwnedHistory([...OwnedHistory , temp ])
      // }


    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  if(networkData2){
      const contract2 = new web3.eth.Contract(Market.abi, networkData2.address) ; setMarketContract(contract2) ;
      contract2.methods.getListing(id).call().then(listing => {
        console.log(listing);
        if(listing.token[0] !== '0x0000000000000000000000000000000000000000') 
        {setCostInTokens(listing.price) }
        else{
          setCostInTokens('Not Listed For Sale')
        }
      } ) ;
    } else {
      window.alert('Smart contract 2 not deployed to detected network.')
    }
  }

  const starter = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  useEffect(() => {
     starter()
  }, [])
  
  
  return (
    <div style={{margin:'50px 0px'}} >
    <Container>
      <Grid container spacing={2}>

        <Grid item md={7}>
        <img style={{width:'100%',height:'auto'}} src={`https://ipfs.infura.io/ipfs/${URI}`} />
        <Typography variant='h1'><b>Hitman #{id}</b> </Typography>
        <Typography variant='h1'>         
        <p size="small"> <b style={{fontSize:'1.7rem'}} >{costInTokens / (10**18)}</b> <img style={{height:'2rem',borderRadius:'50%'}} src='/tokenpic.jpg'/> </p>
        </Typography>
        <Button size="small"> Owned By {OwnedBy == owner ? ' the Creator' : OwnedBy == account ? ' You' : ' Someone else' }</Button>
        </Grid>

        <Grid item md={5}>
        <Paper elevation={3} >
        <TableContainer>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Owner Address</TableCell>
            <TableCell align="right">Tokens</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OwnedHistory.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._ownerAddress == owner ? ' the Creator' : row._ownerAddress == account ? ' You' : ' Someone else'}
              </TableCell>
              <TableCell align="right">{row._boughtFor} <img style={{height:'1.9rem',borderRadius:'50%'}} src='/tokenpic.jpg'/> </TableCell>
              <TableCell align="right">{row._boughtFrom == owner ? ' the Creator' : row._boughtFrom == account ? ' You' : ' Someone else'}</TableCell>
              <TableCell align="right">{ (Date(row._timeBought * 1000)).split(' ')[1] } {(Date(row._timeBought * 1000)).split(' ')[2]} {(Date(row._timeBought * 1000)).split(' ')[4]} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Paper>
        </Grid>

        <Button onClick={()=> contract.methods.approve(MarketContract._address,id).send({ from : account })} >Approve</Button>
        <Button onClick={()=> contract.methods.buyNFT(id).send({ value:50000000000000000 , from : account })} >Buy NFT</Button>
        <Button onClick={()=> contract.methods.setForSale(id,'50000000000000000').send({from : account })} >Set for Sale</Button>
      </Grid>

    </Container>
    </div>
  )
}
