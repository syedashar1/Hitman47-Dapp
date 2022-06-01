import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingleCard({id , contract , owner , account}) {

    const [costInTokens, setCostInTokens] = useState(null)
    const [URI, setURI] = useState(null)
    const [OwnedBy, setOwnedBy] = useState(null)

    const getTokenInfo  = async () => {
        const x = await contract.methods.ownerOf(id).call() ;
        setOwnedBy(x);
        const y = await contract.methods.tokenURI(id).call() ;
        setURI(y);
        // const z = await contract.methods.costInTokens(id).call() ;
        // setCostInTokens(z);
    } 

    React.useEffect(() => {
        getTokenInfo();
    }, [])
    

  return (
    <Card sx={{ maxWidth: 345 , margin:1 }}>
      <CardMedia
        component="img"
        height="250"
        image={`https://ipfs.infura.io/ipfs/${URI}`}
        alt="agent pic"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hitman #{id}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
         <p size="small"> <b style={{fontSize:'1.5rem'}} >{costInTokens / (10**18)}</b> <img style={{height:'1.9rem',borderRadius:'50%'}} src='/tokenpic.jpg'/> </p>
        <Button size="small"> Owned By {OwnedBy == owner ? ' the Creator' : OwnedBy == account ? ' You' : ' Someone else' }</Button>
    </Card>
  );
}