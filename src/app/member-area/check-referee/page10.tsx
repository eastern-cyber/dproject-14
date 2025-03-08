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
import WalletConnect from "@/components/WalletConnect";
import { table } from "console";

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

    if (loading) return <div className="p-6">Loading...</div>;
    if (!users) return <div className="p-6 text-red-600">Failed to load data.</div>;

    const matchingUsers = users.filter(
        (user) => user.referrerId === referrerId && user.userId.trim() !== ""
    ).map((user, index) => ({ ...user, recordNumber: index + 1 }));

    const matchingUser = users.find(user => user.userId === referrerId);

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
                    placeholder="ใส่เลขกระเป๋า..."
                    value={referrerId}
                    onChange={(e) => setReferrerId(e.target.value)}
                    className="text-center border border-gray-400 p-2 rounded mt-4 w-full bg-gray-800 text-white"
                />
                {matchingUser && (
                    <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                        <thead>
                            <tr>
                                <th className="text-[19px] border border-gray-400 px-4 py-2">รายละเอียดผู้แนะนำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="text-[18px] font-thin border border-gray-400 px-4 py-2">
                                    <b>เลขกระเป๋า:</b> {matchingUser.userId}<br />
                                    <b>อีเมล:</b> {matchingUser.email || "N/A"}<br />
                                    <b>ชื่อ:</b> {matchingUser.name || "N/A"}<br />
                                    {/* <b>วันลงทะเบียนผู้ใช้:</b> {matchingUser.userCreated || "N/A"}<br /> */}
                                    {/* <b>วันเข้าร่วม Plan A:</b> {matchingUser.planA || "N/A"}<br />
                                    <b>วันเข้าร่วม Plan B:</b> {matchingUser.planB || "N/A"}<br /> */}
                                    {/* <span className="text-[19px] text-red-600">
                                        <b>Token ID: {matchingUser.tokenId || "N/A"}</b>
                                    </span><br /> */}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                )}
                {matchingUsers.length > 0 && (
                    <table className="table-auto border-collapse border border-gray-500 mt-4 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">#</th>
                                <th className="border border-gray-400 px-4 py-2">รายละเอียดสมาชิกใต้สายงาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchingUsers.map((user) => (
                                <tr key={user.userId}>
                                    <th className="border border-gray-400 px-4 py-2">{user.recordNumber}</th>
                                    <th className="border border-gray-400 px-4 py-2">
                                        <b>เลขกระเป๋า:</b>&nbsp;
                                        <button
                                            className="text-yellow-500 hover:text-red-500"
                                            onClick={() => setReferrerId(user.userId)}
                                        >
                                            {user.userId}
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <WalletBalances walletAddress={account?.address || ""} setReferrerId={setReferrerId} />
                <Link className="border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600" href="/member-area">
                    กลับสู่พื้นที่สมาชิก
                </Link>
            </div>
        </main>
    );
}

interface WalletBalancesProps {
    walletAddress?: string;
    setReferrerId: (id: string) => void;
}

const WalletBalances: React.FC<WalletBalancesProps>= ({ walletAddress, setReferrerId }) => (
    <div className="flex flex-col items-center p-6">
        <p className="text-[19px]"><b>เลขกระเป๋าของท่าน</b></p>
        <div className="text-[18px] border border-gray-500 bg-[#1e1d59] p-2 mt-2 rounded">
            <button
                className="text-yellow-500 hover:text-red-500"
                onClick={() => setReferrerId(walletAddress ?? "")}
            >
                {walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}
            </button>
        </div>
            <p className="my-3 text-[16px]">
                คลิ๊กเลขกระเป๋าด้านบนนี้ เพื่อกลับไปเริ่มต้นที่สายงานของท่าน
            </p>
    </div>
);

function Header() {
    return (
        <header className="flex flex-col items-center mb-4">
            <Link href="/">
                <Image src={dprojectIcon} alt="" className="m-8 size-[100px]" />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold mb-6">Check Referee</h1>
            <WalletConnect />
        </header>
    );
}
