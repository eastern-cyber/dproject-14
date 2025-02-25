"use client";

import Image from "next/image";
import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
// import thirdwebIcon from "@public/thirdweb.svg";
import dprojectIcon from "@public/DFastLogo_650x600.svg";
import { chain } from "./chain";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { getContractMetadata } from "thirdweb/extensions/common";
import { contract } from "../../utils/contracts";
import Link from "next/link";

export default function Home() {
  const account = useActiveAccount ();

  const { data: contractMetadata } = useReadContract(
    getContractMetadata,
    {
      contract: contract,
    }
  );

  if(!account)
  {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          <Header />

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
              connectButton={{ label: "ล็อกอิน" }}
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

          <ThirdwebResources />
        </div>
      </main>
    );
  }

  return (
    <div style={{
      display: "flex",
      margin: "30px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "8px",
      }}>
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
        {contractMetadata && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            marginTop: "20px",
          }}>
            <div>
            <MediaRenderer
              client={client}
              src={contractMetadata.image}
              style={{
                borderRadius: "8px",
              }}
            />
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center",
              marginTop: "20px",
            }}>
            <p style={{ 
              fontSize: "20px",
              fontWeight: "bold",
          }}>
          ยืนดีต้อนรับสู่ DProject
          </p>
            <p style={{
              fontSize: "16px",
              marginTop: "10px",
            }}>
              <a 
                href="/member-area"
                className="flex flex-col border bg-zinc-800 border-zinc-500 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors hover:border-zinc-300"
              >
                <p className="text-[18px] break-words tex-center">เข้าสู่พื้นที่สมาชิก</p>
              </a>
            </p>
            </div>
          </div>
        )}
      </div>
      {/* <div style={{
        display: "flex",
        margin: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "90%",
        // border: "1px solid #333",
        borderRadius: "8px",
      }}>
          <p style={{
            fontSize: "20px",
          }}>
          รายการทรัพย์สิน
          </p>
          <p style={{
            fontSize: "15px",
            marginTop: "10px",
          }}>
          <a href="/assets">แสดงรายการทรัพย์สินที่ถือครอง</a>
          </p>
      </div> */}
      <div style={{margin:"30px"}}>
        <ThirdwebResources />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      {/* <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}
      <Link href="/" passHref>
        <Image
          src={dprojectIcon}
          alt=""
          className="size-[150px] md:size-[150px]"
          style={{
            filter: "drop-shadow(0px 0px 24px #a726a9a8)",
          }}
        />
      </Link>
      <p>&nbsp;&nbsp;</p>
      <h2 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        <span className="inline-block text-blue-500"> DProject </span>
        &nbsp;&nbsp;&nbsp;
        <span className="inline-block -skew-x-6 text-white"> Login </span>
        &nbsp;
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        &nbsp;
        <span className="inline-block -skew-x-6 text-white"> Register </span>
      </h2>

      <p className="text-zinc-300 text-base">
        ล็อกอินด้วยอีเมลล์{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          OTP
        </code>{" "}
        Web3 E-Mail Login
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="เกี่ยวกับโครงการ DProject"
        href="/about"
        description="More detail about DProject"
      />

      <ArticleCard
        title="ต้นแบบ Application ก๊อกๆๆ"
        href="https://3k.aseanquality.com/"
        description="3K หรือ Kok Kok Kok จะต่อยอดจาก SocialApp ยอดนิยม"
      />

      <ArticleCard
        title="DProject Timeline"
        href="/timeline"
        description="แสดงรายละเอียดไทม์ไลน์และความคืบหน้าของโครงการ"
      />

      {/* <ArticleCard
        title="รายการทรัพย์สิน"
        href="/assets"
        description="แสดงรายการทรัพย์สินที่ท่านถือครอง"
      />

      <ArticleCard
        title="ต้นแบบ Application ก๊อกๆๆ"
        href="https://3k.aseanquality.com/"
        description="3K หรือ Kok Kok Kok จะต่อยอดจาก SocialApp ยอดนิยม"
      />

      <ArticleCard
        title="DProject Timeline"
        href="/timeline"
        description="แสดงรายละเอียดไทม์ไลน์และความคืบหน้าของโครงการ"
      /> */}
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      // target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
