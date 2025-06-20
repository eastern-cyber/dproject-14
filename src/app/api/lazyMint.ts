import type { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { ThirdwebSDK } from "thirdweb";
import { polygon } from "thirdweb/chains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  }

  try {
    // 1. Initialize SDK
    const sdk = new ThirdwebSDK({
      chain: polygon,
      clientId: process.env.THIRDWEB_CLIENT_ID,
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    // 2. Get your contract
    const contract = await sdk.getContract(
      "0xf96190438548F0A6D6C3116D8e57058AB76DC986",
    );

    // 3. Parse batch metadata from request body
    const batchMetadata = req.body.metadata;
    if (
      !Array.isArray(batchMetadata) ||
      batchMetadata.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: "Invalid or missing metadata array",
        });
    }

    // 4. Perform batch lazy mint
    const result =
      await contract.erc1155.lazyMint(batchMetadata);

    const startTokenId = Number(result.firstTokenId);
    const count = Number(result.count);

    // 5. Set claim condition for each new token
    const claimCondition = {
      price: "40",
      currencyAddress:
        "0x0000000000000000000000000000000000001010", // POL (MATIC)
      maxClaimablePerWallet: 1,
      maxClaimableSupply: "0", // unlimited
      startTime: new Date(),
      waitInSeconds: 0,
      snapshot: [],
      merkleRootHash: "",
    };

    // Set claim conditions in parallel for speed
    await Promise.all(
      Array.from({ length: count }, (_, i) => {
        const tokenId = (startTokenId + i).toString();
        return contract.erc1155.claimConditions.set(
          tokenId,
          [claimCondition],
        );
      }),
    );

    res.status(200).json({
      success: true,
      tokenIds: Array.from(
        { length: count },
        (_, i) => startTokenId + i,
      ),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
