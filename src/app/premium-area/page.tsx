"use client";
import React from 'react'
import Image from "next/image";
import {  ConnectButton, useActiveAccount, darkTheme } from "thirdweb/react";
import dprojectIcon from "@public/DProjectLogo_650x600.svg";
import { client } from "../client";
import { chain  } from "../chain";
import Link from 'next/link';
import {
    inAppWallet,
    createWallet,
  } from "thirdweb/wallets";

export default function PremiumArea() {
    const account = useActiveAccount();

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div className="flex flex-col items-center justify-center p-5 m-5 border border-gray-800 rounded-lg">
                <Link href="/" passHref>
                    <Image
                        src={dprojectIcon}
                        alt=""
                        className="mb-4 size-[100px] md:size-[100px]"
                        style={{
                            filter: "drop-shadow(0px 0px 24px #a726a9a8"
                        }}
                    />
                </Link>

                <h1 className="p-4 text-1xl md:text-3xl text-2xl font-semibold md:font-bold tracking-tighter">
                    พื้นที่สมาชิกพรีเมี่ยม
                </h1>
                <div className="flex justify-center mb-2">
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
                        connectButton={{ label: "ล็อกอิน" }}
                        connectModal={{
                            title: "เชื่อมต่อกระเป๋า",
                            titleIcon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            size: "wide", // Change to "compact" or "auto" 
                        }}
                        supportedTokens={{
                        [chain.id]: [
                            // {
                            //     address: "0xca23b56486035e14F344d6eb591DC27274AF3F47",
                            //     name: "DProject",
                            //     symbol: "DFI",
                            //     icon: "https://dfi.fund/_next/static/media/DFastLogo_650x600.4f2ec315.svg",
                            // },
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
                        "0x60aD2f102FDb0e09ED50e2ab07573079C956aFB8",
                    ],
                    }}
                    theme={darkTheme({
                    colors: {
                        modalBg: "hsl(241, 51%, 23%)",
                        borderColor: "hsl(60, 99%, 56%)",
                        accentText: "hsl(0, 100%, 60%)",
                        separatorLine: "hsl(22, 100%, 37%)",
                        secondaryText: "hsl(251, 20%, 50%)",
                        primaryText: "hsl(240, 89%, 93%)",
                        accentButtonBg: "hsl(22, 100%, 37%)",
                        tertiaryBg: "hsl(231, 11%, 12%)",
                        accentButtonText: "hsl(0, 0%, 97%)",
                        connectedButtonBg: "hsl(241, 51%, 23%)",
                        connectedButtonBgHover: "hsl(241, 50%, 17%)",
                    },
                    })}
                />
            </div>
            <div className="flex flex-col items-center mb-6">
                <WalletPublicKey walletAddress={account?.address || ""}/>
            </div>

            </div>
            <div className="flex flex-col items-center">
                    <a 
                        className="flex flex-col mt-4 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors hover:border-zinc-800"
                        href="/">กลับหน้าหลัก</a>
            </div>
        </main>
    )
}

type walletAddresssProps = {
    walletAddress?: string;
};

const WalletPublicKey: React.FC<walletAddresssProps> = ({ walletAddress }) => {
    const handleCopy = () => {
        const link = `https://dfi.fund/referrer/${walletAddress}`;
        navigator.clipboard.writeText(link);
        alert("ลิ้งค์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว!");
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                fontSize: "24px",
                justifyContent: "center",
                paddingTop: "15px",
                // paddingBottom: "5px",
              }}
            >
                <span className="mt-4 text-[22px]">ลิ้งค์แนะนำของท่าน</span>
                <div 
                    style={{border: "1px solid #dfea08", background: "#2b2b59", padding: "4px 8px", margin: "6px", cursor: "pointer"}} 
                    onClick={handleCopy}
                >
                    <p className="text-[16px] break-all">
                        {walletAddress ? `https://dfi.fund/referrer/${walletAddress}` : "ยังไม่ได้เชื่อมกระเป๋า !"}
                    </p>    
                </div>
                <span className="text-center mt-4 text-[20px] break-words">เพื่อส่งให้ผู้มุ่งหวัง ที่ท่านต้องการแนะนำ</span>
                <div>
                {/* <p className="text-[16px] break-all">{walletAddress ? walletAddress || "" : "ยังไม่ได้เชื่อมกระเป๋า !"} </p> */}
                </div>
                <div className="flex flex-col items-center justify-center p-5 border border-gray-800 rounded-lg text-[19px] text-center font-bold mt-10">
                    <span className="m-2 text-[#eb1c24] text-[22px] animate-blink">สมาชิกพรีเมี่ยม !</span>
                    เตรียมเปิดร้านค้าออนไลน์<br />และประชาสัมพันธ์ ผ่านแอ๊พ 
                    <span className="mt-2 text-[#eb1c24] text-3xl animate-blink">ก๊อกๆๆ !</span>
                </div>
            </div>
        </div>
    )
};