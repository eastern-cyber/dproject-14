"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount, darkTheme } from "thirdweb/react";
import dprojectIcon from "@public/DProjectLogo_650x600.svg";
import { client } from "../../client";
import { chain } from "../../chain";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    inAppWallet,
    createWallet,
  } from "thirdweb/wallets";

interface UserData {
    userId: string;
    referrerId: string;
    name?: string;
    email?: string;
    tokenId?: string;
    userCreated?: string;
    planA?: string;
    planB?: string;
}

export default function RefereePage() {
    const account = useActiveAccount();
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    const usersUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.1/main/public/dproject-users.json";

    useEffect(() => {
        if (account?.address) {
            setReferrerId(account.address);
        }
    }, [account?.address]);

    useEffect(() => {
        fetch(usersUrl)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading JSON:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!users) {
        return <div className="p-6 text-red-600">Failed to load data.</div>;
    }

    const matchingUsers = referrerId.trim()
        ? users
            .filter((user) => user.referrerId === referrerId && user.userId.trim() !== "")
            .map((user, index) => ({ ...user, recordNumber: index + 1 }))
        : [];

    // function formatDate(date: Date | string | null): string {
    //     if (!date) return "N/A";
        
    //     const parsedDate = new Date(date);
    //     return parsedDate.toLocaleString("th-TH", {
    //         day: "2-digit",
    //         month: "2-digit",
    //         year: "2-digit",
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         hour12: false, // Ensures 24-hour format
    //     });
    // }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
    
        // Manually parse "07/03/2025, 13:39:10" (DD/MM/YYYY, HH:mm:ss)
        const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})$/);
        if (!match) return "Invalid Date";
    
        const [, day, month, year, hour, minute, second] = match.map(Number);
        
        const date = new Date(year, month - 1, day, hour, minute, second); // Month is 0-based in JS
    
        return date.toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Ensures 24-hour format
        });
    };
    
    // const formatDate = (dateString?: string) => {
    //     if (!dateString) return "N/A";
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString("th-TH", {
    //         day: "2-digit",
    //         month: "2-digit",
    //         year: "2-digit",
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         second: "2-digit",
    //         hour12: false, // Ensures 24-hour format
    //     });
    // };

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
                margin: "20px",
                // border: "1px solid #333",
                // borderRadius: "8px",
            }}>
                <Header />
                <h1 className="text-center text-[20px] font-bold">ตรวจสอบรายชื่อสายงาน</h1>
                <h2 className="text-center text-[16px]">ใส่เลขกระเป๋าของท่าน หรือ เลขกระเป๋าของผู้ที่ต้องการจะตรวจสอบ</h2>
                <input
                    type="text"
                    placeholder="ใส่เลขกระเป๋าของผู้ที่ท่านต้องการตรวจสอบสายงาน"
                    value={referrerId}
                    onChange={(e) => setReferrerId(e.target.value)}
                    className="text-center border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
                />
                {/* <h2 className="text-center text-[18px] font-semibold mt-4">รายการผู้ที่ท่านแนะนำ</h2> */}
                {matchingUsers.length > 0 && (
                    <>
                        <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">#</th>
                                    <th className="text-[19px] border border-gray-400 px-4 py-2">รายละเอียดสมาชิกใต้สายงาน </th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchingUsers.map((user) => (
                                    <tr key={user.userId}>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {user.recordNumber}
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {/* <b>เลขกระเป๋า</b>(ย่อ)<b>:</b> {user.userId.slice(0, 6)}...{user.userId.slice(-4)}<br /> */}
                                            <b>เลขกระเป๋า:</b>&nbsp; 
                                                <button 
                                                    className="text-yellow-500 hover:text-red-500 active:text-blue-500"
                                                    onClick={() => setReferrerId(user.userId)}
                                                >
                                                    {user.userId}
                                                </button><br />
                                            <b>อีเมล:</b> {user.email || "N/A"}<br />
                                            <b>ชื่อ:</b> {user.name || "N/A"}<br />
                                            <b>วันลงทะเบียนผู้ใช้:</b> {formatDate(user.userCreated) || "N/A"}<br />
                                            <b>วันเข้าร่วม Plan A:</b> {formatDate(user.planA) || "N/A"}<br />
                                            <b>วันเข้าร่วม Plan B:</b> {formatDate(user.planB) || "N/A"}<br />
                                            <span className="text-[19px] text-red-600"><b>Token ID: {user.tokenId || "N/A"}</b></span><br />
                                        </td>
                                        {/* <td className="border border-gray-400 px-4 py-2">{user.tokenId || "N/A"}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-4 text-lg font-semibold">รวม : {matchingUsers.length} ท่าน</p>
                    </>
                )}
                <WalletBalances walletAddress={account?.address || ""} setReferrerId={setReferrerId} />
            </div>
            <div className="flex flex-col mt-4 justify-center items-center w-full">
                <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-800" href="/member-area">
                    <p className="text-center text-[19px]">กลับสู่พื้นที่สมาชิก</p>
                </Link>
            </div>
        </main>
    );
}

interface WalletBalancesProps {
    walletAddress?: string;
    setReferrerId: (id: string) => void;
}

const WalletBalances: React.FC<WalletBalancesProps> = ({ walletAddress, setReferrerId }) => {
    return (
        <div className="flex flex-col items-center p-6">
            <p className="text-[19px]"><b>เลขกระเป๋าของท่าน</b></p>
            <div className="border border-gray-500 bg-[#1e1d59] p-2 mt-2 rounded">
                <button
                    className="text-yellow-500 hover:text-red-500 active:text-blue-500 text-[18px]"
                    onClick={() => setReferrerId(walletAddress ?? "")}
                >
                    {walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}
                </button>
                {/* <p className="text-[18px] break-all">{walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}</p> */}
            </div>
                <p className="my-3 text-[16px]">
                    คลิ๊กเลขกระเป๋าด้านบนนี้ เพื่อกลับไปเริ่มต้นที่สายงานของท่าน
                </p>
        </div>
    );
};

function Header() {
    return (
        <header className="flex flex-col items-center mb-4">
            <Link href="/" passHref>
                <Image
                    src={dprojectIcon}
                    alt=""
                    className="m-8 size-[100px]"
                    style={{ filter: "drop-shadow(0px 0px 24px #a726a9a8" }}
                />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold tracking-tighter">
                Check Referee
            </h1>
            <div className="flex justify-center my-6">
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
        </header>
    );
}
