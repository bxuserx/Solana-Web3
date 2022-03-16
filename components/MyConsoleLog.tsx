import { Button } from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature, PublicKey } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { useNotify } from './notify';
import bs58 from 'bs58';
import { Connection, programs } from '@metaplex/js';
const { metadata: { Metadata } } = programs;
//import encoding from 'text-encoding';
//import {TextEncoder, TextDecoder} from 'text-encoding/index.js';
import {Buffer} from 'buffer';
import web3 from '@solana/web3.js';


export const MyConsoleLog: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const notify = useNotify();

    const consoleLog = useCallback(async () => {

        // ----- Public Key and Connection info:
        console.log(`==================================================`);
        
        console.log(`Public Key: `, publicKey);
        console.log(`Connection: `, connection);


        // ----- Account info
        let myInfo = await connection.getAccountInfo(publicKey!, "confirmed")  // ! = Force that variable is not null
        console.log(`Account Info Owner: ${myInfo?.owner}`);
        console.log(`Account Info Lamports: ${myInfo?.lamports}`);  // ? = Undefined or not
        // console.log(`Send Transaction: `, sendTransaction);

     
        // ------- ACCORDING TO SOLSCAN.IO --------- //
        const userAddressString       = "B25ksMBxVdKE8rEPTt4qf549zmA62iBmwTP4Y21BNzor";
        const secondUserAddressString = "4E769sdT9ChWFhV4znHT8UyLsY1VyLGoMXK3PZiBoaMy";


        // Dandelions Collection 
        // https://solscan.io/token/DJUqan7cgMXU98SmGmxmpWhJW5SXDbbuTzez84KQixYY?cluster=devnet#metadata
        const tokenMintAddressString       = 'DJUqan7cgMXU98SmGmxmpWhJW5SXDbbuTzez84KQixYY';  // This is the SPL address for the NFT
        const tokenAccountAddressString    = 'znV6iFzPsiezotQnesgfpoykFRcNCcrRoRrvkjDLAPd';   // This is the account associated with the metadata for the NFT
        const tokenMintAuthorityString     = '431Wsqn6JsL1uc189qEn9JtpoKSuGhyBaJX6kiXJVrtu';  // Token mint authority data account
        const tokenUpdateAuthorityString   = 'B25ksMBxVdKE8rEPTt4qf549zmA62iBmwTP4Y21BNzor';  // List of all SPL tokens owned by the userAddressString
        const creatorAddressMetaplexString = '8E9B9n6rxzWLAWESUHhoSVc3huKmVLuF7KvTMs5tEFRV';  // 
        const creatorAddressUserString     = 'B25ksMBxVdKE8rEPTt4qf549zmA62iBmwTP4Y21BNzor';  // 
        const splTokenProgramString        = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

        const tokenMintAddress        = new PublicKey(tokenMintAddressString);       // In Base58 representation
        const tokenAccountAddress     = new PublicKey(tokenAccountAddressString); 
        const tokenMintAuthority      = new PublicKey(tokenMintAuthorityString);
        const tokenUpdateAuthority    = new PublicKey(tokenUpdateAuthorityString);
        const creatorAddressMetaplex  = new PublicKey(creatorAddressMetaplexString);
        const creatorAddressUser      = new PublicKey(creatorAddressUserString)
        const splTokenProgram         = new PublicKey(splTokenProgramString);

        const keyArr = [tokenMintAddress, tokenAccountAddress, tokenMintAuthority, tokenUpdateAuthority, creatorAddressMetaplex, creatorAddressUser, splTokenProgram]



        // ---------- METAPLEX API ----------- //
        // ----- View Token Metadata: 
        const metadataPDA = await Metadata.getPDA(tokenMintAddress);
        const tokenMetadata = await Metadata.load(connection, metadataPDA);
        console.log(`Viewing Token Metadata`, tokenMetadata.data);

        // ----- URI info
        const uriLink = tokenMetadata.data.data.uri;
        console.log(`uriLink: `, uriLink);
        const uriString = await fetch(uriLink);
        const uriJSON = await uriString.json();
        console.log(`uriString: `, uriJSON);
        console.log(`URI External link: `, uriJSON.external_url ); 
        


        // ----- Finding Account that owns an NFT: 
        const largestAccounts = await connection.getTokenLargestAccounts(tokenMintAddress);
        const largestAccountInfo = await connection.getParsedAccountInfo(largestAccounts.value[0].address);
        console.log(`Account that Owns the NFT: `, largestAccountInfo.value?.data.parsed.info.owner);
        //console.log(largestAccountInfo.value?.data.parsed.info.owner);


        // ----- Get All NFTs from a wallet:
        const ownerPublickey = creatorAddressUser; //'OWNER_PUBLICK_KEY';
        const nftsmetadata = await Metadata.findDataByOwner(connection, ownerPublickey);
        console.log(`All NFTs from wallet ${creatorAddressUser}`, nftsmetadata);



        // const tokenPublicKey = 'Gz3vYbpsB2agTsAwedtvtTkQ1CG9vsioqLW3r9ecNpvZ';
        // const ownedMetadata = await Metadata.load(connection, tokenPublicKey); //tokenPublicKey);
        // console.log(`Owned Metadata: `, ownedMetadata);


        // const tokenAcctsObj = {
        //   mint: tokenMintAddr
        //   //programId: splTokenProgram
        // }
      
        // let tokenAcctsByOwner = await connection.getTokenAccountsByOwner(userAddr, tokenAcctsObj);
        // //let myTknAcctsByOwner = await connection.getTokenAccountsByOwner(mySecondAcct, tokenAcctsObj);
        // console.log(`Token Accounts by Owner: ${JSON.stringify(tokenAcctsByOwner)}`);
        // const tokenAcctNumber = tokenAcctsByOwner.value.length
        // console.log(`Token Accounts by Owner (value length): ${tokenAcctNumber}`);
      
        // const tokenAcctsData = tokenAcctsByOwner.value[0].account.data;

        const myFilter = {programId: splTokenProgram};
        // if (publicKey) {
        //   let myTknAcctsByOwner = await connection.getTokenAccountsByOwner(publicKey!, myFilter);  // ! = definitely defined.
        //           // console.log(`Token Accounts: ${JSON.stringify(myTknAcctsByOwner)}`);
        // console.log(`Token Accounts:`, myTknAcctsByOwner);
        // } else {
        //   console.error(``);
        // }

        let myTknAcctsByOwner = await connection.getTokenAccountsByOwner(publicKey!, myFilter);  // ! = definitely defined.
        // console.log(`Token Accounts: ${JSON.stringify(myTknAcctsByOwner)}`);
        console.log(`Token Accounts:`, myTknAcctsByOwner);







        //console.log(`Account Data Buffer: ${myTknAcctsByOwner.value[0].account.data.toString('utf8')}`);
        const myDataBuffer = Array.from(myTknAcctsByOwner.value[0].account.data);
        //const myDataBufferDecoded = web3.Struct.decode(myTknAcctsByOwner.value[0].account.data);
        console.log(`Account Data Buffer:`, myDataBuffer);
        //console.log(`Account Data Buffer: ${myDataBufferDecoded}`);
      }, [publicKey, notify, connection]);


      return(
          <Button variant="contained" color="primary" onClick={consoleLog} disabled={!publicKey}>
                Console Log
          </Button>
        );
}