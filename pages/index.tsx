import { FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import {
    WalletConnectButton as ReactUIWalletConnectButton,
    WalletDisconnectButton as ReactUIWalletDisconnectButton,
    WalletModalButton as ReactUIWalletModalButton,
    WalletMultiButton as ReactUIWalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { NextPage } from 'next';
import { useAutoConnect } from '../components/AutoConnectProvider';
import { RequestAirdrop } from '../components/RequestAirdrop';
import { SendTransaction } from '../components/SendTransaction';
import { SignMessage } from '../components/SignMessage';
import { MyConsoleLog } from '../components/MyConsoleLog';
import { ZZtestComponent } from '../components/ZZtestComponent';
import pkg from '../package.json';

const Index: NextPage = () => {
    const { autoConnect, setAutoConnect } = useAutoConnect();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell width={400}>REACT UI: Example v{pkg.version}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Multi Button</TableCell>
                    <TableCell>
                        <ReactUIWalletMultiButton />
                    </TableCell>
                    <TableCell>
                        <MyConsoleLog />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Tooltip title="Only runs if the wallet is ready to connect" placement="left">
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="autoConnect"
                                        color="secondary"
                                        checked={autoConnect}
                                        onChange={(event, checked) => setAutoConnect(checked)}
                                    />
                                }
                                label="AutoConnect"
                            />
                        </Tooltip>
                    </TableCell>
                    <TableCell>
                        <RequestAirdrop />
                    </TableCell>
                    <TableCell>
                        <SendTransaction />
                    </TableCell>
                    <TableCell>
                        <SignMessage />
                    </TableCell>
                    {/*<TableCell>
                        <ZZtestComponent />
                            </TableCell> */}
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Index;
