"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import dprojectIcon from "@public/DFastLogo_650x600.svg";

const MintingPage = () => {
  const [data, setData] = useState<{ var1: string; var2: string; var3: string; var4: string } | null>(null);

  useEffect(() => {
    // Retrieve stored data when page loads
    const storedData = sessionStorage.getItem("mintingsData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
        <div className="flex flex-col items-center justify-center p-10 m-5 border border-gray-800 rounded-lg">                
            <Image
            src={dprojectIcon}
            alt=""
            className="mb-4 size-[100px] md:size-[100px]"
            style={{
                filter: "drop-shadow(0px 0px 24px #a726a9a8"
            }}
            />
                <h1 className="p-4 md:text-2xl text-2xl font-semibold md:font-bold tracking-tighter">
                    Mint 3K NFT
                </h1>
                <div className="flex justify-center m-2">
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
                
                <div>
                    {data ? (
                        <>
                        <div className="flex flex-col items-center justify-center p-2 m-2">
                            <p className="flex flex-col items-center justify-center text-[20px] m-3"><b>เลขกระเป๋าของผู้แนะนำ</b></p>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center", // Centers vertically
                                border: "1px solid #666",
                                background: "#222",
                                padding: "0px 6px",
                                margin: "10px",
                                height: "40px" // Optional: Ensure enough height for centering
                            }}>
                                {/* <p style={{fontSize: "18px"}}>{params.referrerId}</p> */}
                                <p style={{ fontSize: "18px" }}>
                                    {data.var1 ? `${data.var1.slice(0, 6)}...${data.var1.slice(-4)}` : ""}
                                </p>
                            </div>
                        </div>
                            <div className="flex flex-col items-center justify-center p-3 m-2 border border-gray-800">
                            <p className="mb-4"><u>ขอมูลเพื่อการตรวจสอบระบบ</u></p> 
                            <p>Variable 1: {data.var1}</p>
                            <p>Variable 2: {data.var2}</p>
                            <p>Variable 3: {data.var3}</p>
                            <p>Variable 4: {data.var4}</p>
                            </div>
                        </>
                    ) : (
                        <p>No data available.</p>                        
                    )}
                </div>
        </div>
    </main>
  );
};

export default MintingPage;