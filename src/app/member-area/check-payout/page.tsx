"use client";

import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import dprojectIcon from "@public/DProjectLogo_650x600.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import WalletConnect from "@/components/WalletConnect";
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

interface ReportData {
    walletAddress: string;
    sentAmount: number;
    sentDate: string;
}

export default function RefereePage() {
    const account = useActiveAccount();
    const [users, setUsers] = useState<UserData[] | null>(null);
    const [reportData, setReportData] = useState<ReportData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [referrerId, setReferrerId] = useState("");

    const usersUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.1/main/public/dproject-users.json";
    const reportUrl = "https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.1/438a39e0b51bc39cc1619678ecb569f0f84f7cb1/public/send-pol-report.json";

    useEffect(() => {
        if (account?.address) {
            setReferrerId(account.address);
        }
    }, [account?.address]);

    useEffect(() => {
        Promise.all([
            fetch(usersUrl).then((res) => res.json()),
            fetch(reportUrl).then((res) => res.json()),
        ])
            .then(([userData, reportData]) => {
                setUsers(userData);
                setReportData(reportData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading JSON:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!users || !reportData) return <div className="p-6 text-red-600">Failed to load data.</div>;

    const matchingUsers = users.filter(
        (user) => user.referrerId === referrerId && user.userId.trim() !== ""
    ).map((user, index) => ({ ...user, recordNumber: index + 1 }));

    const matchingUser = users.find(user => user.userId === referrerId);
    const reportEntry = reportData.find(report => report.walletAddress === matchingUser?.userId);
    const sentAmount = reportEntry?.sentAmount || 0;
    const sentDate = reportEntry?.sentDate || "N/A";

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex flex-col items-center">
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px",
                margin: "20px",
            }}>
                <Header />
                <h1 className="text-center text-[20px] font-bold">รายละเอียด ส่วนแบ่งรายได้</h1>
                {matchingUsers.length > 0 && (
                    <div>
                        <table className="w-full justify-center items-center">
                            <tbody>
                                <tr className="colspan-[1]">
                                    <th>
                                        <p className="mb-12 text-center m-4 pr-10 text-lg font-semibold">
                                            <span className="text-[19px] text-center">
                                                รวมจำนวนสมาชิกแนะนำตรง : &nbsp;&nbsp;
                                                <span className="text-[24px] text-yellow-500">{matchingUsers.length}</span>
                                                &nbsp;&nbsp; ท่าน</span>
                                        </p>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody className="mt-6 w-full justify-center items-center">
                                <tr className="mt-4">
                                    <th className="border border-gray-400 px-4 py-2">
                                            <p className="text-[19px] text-center m-2 text-lg font-semibold">
                                                    ส่วนแบ่งรายได้  การประชาสัมพันธ์
                                            </p>
                                    </th>
                                </tr>
                                <tr className="w-full">
                                    <th className="border border-gray-400 px-4 py-2">
                                        <div className="text-center">
                                            <p className="text-center m-4 text-lg font-semibold">
                                                <span className="text-[18px] text-center">
                                                    รวมทั้งสิ้น&nbsp;&nbsp;&nbsp;
                                                    <span className="text-[24px] text-yellow-500 animate-blink">
                                                        {matchingUsers.length * 12}
                                                    </span> &nbsp; POL
                                                </span>
                                            </p>
                                            <p className="text-center m-4 text-lg font-semibold">
                                                <span className="text-[18px] text-center">
                                                    ชำระแล้ว&nbsp;&nbsp;&nbsp;
                                                    <span className="text-[24px] text-green-500 animate-blink">
                                                        {sentAmount}
                                                    </span> &nbsp; POL
                                                </span>
                                            </p>
                                            <p className="text-center m-4 text-lg font-semibold">
                                                <span className="text-[18px] text-center">
                                                    ค้างชำระ&nbsp;&nbsp;&nbsp;
                                                    <span className="text-[24px] text-red-500 animate-blink">
                                                        {matchingUsers.length * 12 - sentAmount}
                                                    </span> &nbsp; POL
                                                </span>
                                            </p>
                                        </div>
                                    </th>
                                </tr>
                                <tr className="w-full">
                                    <th className="border border-gray-400 px-4 py-2">
                                        <p className="text-center m-4 text-lg font-semibold">
                                            <span className="text-[19px] text-center">
                                                ชำระครั้งล่าสุด<br />
                                                <span className="text-[18px] text-blue-400">
                                                    {sentDate}
                                                </span>
                                            </span>
                                        </p>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <WalletBalances walletAddress={account?.address || ""} setReferrerId={setReferrerId} />
                <Link
                    className="mb-8 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 hover:text-yellow-200 hover:border-yellow-300"
                    href="/member-area/check-referee">
                    <p className="text-center text-[19px]">ตรวจสอบสายงาน</p>
                </Link>
                <Link className="mb-8 border border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 hover:text-yellow-200 hover:border-yellow-300"
                    href="/member-area">
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

const WalletBalances: React.FC<WalletBalancesProps>= ({ walletAddress, setReferrerId }) => (
    <div className="flex flex-col items-center p-6">
        <p className="text-[19px]"><b>เลขกระเป๋าของท่าน</b></p>
        <div className="text-[18px] border border-gray-500 bg-[#1e1d59] p-2 mt-2 rounded">
            <button
                className="text-yellow-500 hover:text-red-500 text-[18px] break-all"
                onClick={() => setReferrerId(walletAddress ?? "")}
            >
                {walletAddress || "ยังไม่ได้เชื่อมกระเป๋า !"}
            </button>
        </div>
            <p className="text-center my-3 text-[16px]">
                คลิ๊กเลขกระเป๋าด้านบนนี้ เพื่อกลับไปเริ่มต้นที่รายละเอียดของตัวท่านเอง
            </p>
    </div>
);

function Header() {
    return (
        <header className="flex flex-col items-center mb-4">
            <Link href="/">
                <Image src={dprojectIcon} alt="" className="m-8 size-[100px]" />
            </Link>
            <h1 className="text-1xl md:text-4xl font-semibold md:font-bold mb-6">Check Payout</h1>
            <WalletConnect />
        </header>
    );
}