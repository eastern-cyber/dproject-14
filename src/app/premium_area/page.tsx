"use client";

import React from 'react'
import { ConnectButton } from 'thirdweb/react'
import { client } from '../client'
import { inAppWallet } from 'thirdweb/wallets'
import styles from "../styles/Home.module.css";
import { chain } from '../chain';

const premiumArea = () => {
  return (
    <main className="{flex justify-items-center}" style={{alignItems: "center", justifyContent: "center", margin: "10px",}}>
        <div style={{
            fontSize:"25px",
            textAlign:"center",
            fontWeight:"bold",
            marginTop:"60px",
        }}>
            <h1>
                พื้นที่สมาชิกพรีเมี่ยม
            </h1>
            <div className="flex justify-center mb-20">
            <ConnectButton locale={"en_US"} 
                client={client}
                chain={chain}
                wallets={[ inAppWallet ({
                auth: {
                    options: [
                        "email",
                    ]
                    }
                }) ]}
                connectModal={{
                    title: "เชื่อมต่อกระเป๋า",
                    titleIcon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                    size: "wide", // Change to "compact" or "auto" 
                }}
                supportedTokens={{
                [chain.id]: [
                    {
                        address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
                        name: "DProject",
                        symbol: "DFI",
                        icon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                    },
                    {
                        address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
                        name: "USDC",
                        symbol: "USDC",
                        icon: "https://polygonscan.com/token/images/centre-usdc_32.png",
                    },
                    {
                        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                        name: "USDT",
                        symbol: "USDT",
                        icon: "https://polygonscan.com/token/images/tether_32.png",
                        },
                ],
                }}
                supportedNFTs={{
                [chain.id]: [
                    "0x2a61627c3457cCEA35482cAdEC698C7360fFB9F2", // nft contract address
                ],
                }}
            />
            </div>
        </div>
    </main>
  )
}

export default premiumArea