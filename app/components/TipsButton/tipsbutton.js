"use client";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  useAccount,
  useToken,
  erc20ABI,
  usePrepareContractWrite,
  useContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { tokenAddress, myAddress } from "@/app/const";
import { parseEther } from "viem";

const TipsButton = () => {
  const { address } = useAccount();
  const [tokenSelect, setTokenSelect] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [amount, setAmount] = useState(0);

  const token = useToken({
    address: tokenAddress,
  });

  const tokens = [{ symbol: "ETH" }, { symbol: tokenSymbol }];

  const tokenTransfer = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "transfer",
    args: [myAddress, amount],
  });

  const ethTransfer = usePrepareSendTransaction({
    to: myAddress,
    value: amount,
  });

  const ethTransaction = useSendTransaction(ethTransfer.config);

  const transaction = useContractWrite(tokenTransfer.config);

  const handleTips = () => {
    if (tokenSelect === "ETH") {
      ethTransaction.sendTransaction();
    } else {
      transaction.write();
    }
  };

  const handleAmount = (e) => {
    setAmount(parseEther(e.target.value));
  };

  const handleChange = (event) => {
    setTokenSelect(event.target.value);
  };

  useEffect(() => {
    if (token?.data) {
      setTokenSymbol(token.data.symbol);
    }
  }, [token]);

  return (
    <>
      {address && (
        <div className={styles[`tips-button`]}>
          <h1>Tips Me Crypto</h1>
          <FormControl className={styles[`select-token`]}>
            <InputLabel>Token</InputLabel>
            <Select
              style={{ width: 200 }}
              id="demo-simple-select"
              value={tokenSelect}
              label="Token"
              onChange={handleChange}
            >
              {tokens.map((token, index) => (
                <MenuItem value={token.symbol} key={index}>
                  {token.symbol}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Amount"
              variant="outlined"
              className={styles[`select-token-input`]}
              onChange={(e) => handleAmount(e)}
            />
          </FormControl>
          <Button variant="contained" onClick={() => handleTips()}>
            Tips Me
          </Button>
        </div>
      )}
    </>
  );
};

export default TipsButton;
