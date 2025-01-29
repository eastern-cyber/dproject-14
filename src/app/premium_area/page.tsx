"use client";

import React from 'react'
import { ConnectButton } from 'thirdweb/react'
import { client } from '../client'
import { inAppWallet } from 'thirdweb/wallets'
import styles from "../styles/Home.module.css";

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
                    // accountAbstraction={{
                    //     chain: chain,
                    //     sponsorGas: true,
                    // }}
                    wallets={[ inAppWallet ({
                    auth: {
                        options: [
                            "email",
                        ]
                    }
                    }) ]}
            />
            </div>
        </div>
    </main>
  )
}

export default premiumArea