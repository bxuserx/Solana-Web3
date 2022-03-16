import React from 'react'
import { FC, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { useNotify } from './notify';


export const ZZtestComponent: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const notify = useNotify();

    console.log(`PublicKey: ${publicKey}`);
    


    {/*const myBalance = useCallback(async () => {
        if (!publicKey) {
            notify('error', 'Wallet not connected!');
            return;
        }

        let myBal = await connection.getAccountInfo;
        notify('info', 'Connection Balance:', myBal.toString);

    }, [publicKey, notify, connection, sendTransaction]);
myBalance(); */}

  return (
    <div>Public Key of wallet: {publicKey}</div>
  )
}