"use client";

import {
    AccountProvider,
    AccountAddress,
    AccountBalance,
    ConnectButton,
    useActiveAccount,
    AccountName,
    AccountAvatar,
  } from "thirdweb/react";
import { client } from "../client";
import { chain } from "../chain";
import { inAppWallet } from "thirdweb/wallets";
  
  const DFAST_POLYGON =
    "0xca23b56486035e14F344d6eb591DC27274AF3F47";
  const POL_POLYGON =
    "0x0000000000000000000000000000000000001010";
  const USDC_POLYGON =
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
  const USDT_POLYGON =
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  
  export default function Assets() {
    const account = useActiveAccount ();

    return (
        <div 
            className="flex items-center justify-center"
            style={{ flexDirection: "column"}}
        >
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    margin: "30px",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    width: "80%",
                    border: "1px solid #333",
                    borderRadius: "8px",
            }}>
                <div className="flex justify-center mb-10 mt-10">
                          <ConnectButton locale={"en_US"}
                              client={client}
                              wallets={[ inAppWallet ({
                                auth: {
                                  options: [
                                    "email",
                                    // "phone",
                                  ]
                                }
                              }
                              ) ]}
                            />
                          </div>
                {/* <div
                    style={{
                        margin: "30px",
                }}>
                    <ConnectButton locale={"en_US"}
                        client={client}
                        chain={chain}
                    />
                </div> */}
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    <AccountAvatar />
                </AccountProvider>
                </div>
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    บัญชีผู้ใช้งาน : <AccountAddress />
                </AccountProvider>
                </div>
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    <AccountBalance
                        chain={chain}
                        tokenAddress={DFAST_POLYGON}
                        loadingComponent={<span>Loading...</span>}
                    />
                </AccountProvider>
                </div>
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    <AccountBalance
                        chain={chain}
                        tokenAddress={POL_POLYGON}
                        loadingComponent={<span>Loading...</span>}
                    />
                </AccountProvider>
                </div>
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    <AccountBalance
                        chain={chain}
                        tokenAddress={USDC_POLYGON}
                        loadingComponent={<span>Loading...</span>}
                    />
                </AccountProvider>
                </div>
                <div>
                <AccountProvider
                    address="0xDdF99A33c49884792a89bD8DE9474138e4E0350a"
                    client={client}
                >
                    <AccountBalance
                        chain={chain}
                        tokenAddress={USDT_POLYGON}
                        loadingComponent={<span>Loading...</span>}
                    />
                </AccountProvider>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 15px 10px 15px",
                border: "1px solid #333",
                borderRadius: "8px",
            }}>
                <a href="/">กลับหน้าหลัก</a>
            </div>
        </div>
    );
  }
  