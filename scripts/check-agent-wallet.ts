import { PearApiClient } from '../src/lib/pear-api';

async function checkAgentWallet() {
    const api = new PearApiClient();
    const apiKey = '10f9ecdd43734f3c9c384a27ff843fc761914f5a7b272b2c91cd7f3910c6de26';
    const testAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

    console.log("🔍 Checking Agent Wallet Status...\n");

    try {
        // Authenticate
        const loginRes = await api.login(testAddress, apiKey);
        api.setTokens(loginRes.accessToken, loginRes.refreshToken);
        console.log("✅ Logged in successfully\n");

        // Check Agent Wallet
        const agentWallet = await api.getAgentWallet();

        if (agentWallet) {
            console.log("📍 Agent Wallet Found:");
            console.log("   Address:", agentWallet.address);
            console.log("   Status:", agentWallet.status);
            console.log("   Is Approved:", agentWallet.isApproved ?? "Unknown");
            console.log("\n⚠️  To trade, this Agent Wallet needs:");
            console.log("   1. ETH for gas fees (on Arbitrum)");
            console.log("   2. USDC for collateral (on Arbitrum)");
            console.log("\n💡 Transfer funds TO THIS ADDRESS from your main wallet or an exchange.");
        } else {
            console.log("❌ No Agent Wallet found!");
            console.log("   Creating one now...");
            const newWallet = await api.createAgentWallet();
            console.log("✅ Agent Wallet Created:", newWallet);
        }

        // Check accounts for more details
        console.log("\n📊 Fetching account details...");
        const accounts = await api.getAccounts();
        console.log("Accounts:", JSON.stringify(accounts, null, 2));

    } catch (error: any) {
        console.error("❌ Error:", error.message);
        if (error.response) {
            console.error("   Status:", error.response.status);
            console.error("   Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

checkAgentWallet();
