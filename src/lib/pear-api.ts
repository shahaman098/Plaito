import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://hl-v2.pearprotocol.io';
const CLIENT_ID = 'HLHackathon8';

export type Position = {
    positionId?: string;
    contractId?: string;
    address?: string;
    longAssets: { asset?: string; coin?: string; weight?: number; entryPrice?: number }[];
    shortAssets: { asset?: string; coin?: string; weight?: number; entryPrice?: number }[];
    leverage?: number;
    marginUsed?: number; // The actual collateral/stake amount
    positionValue?: number; // Current value of the position
    status?: string;
    entryPrice?: number;
    entryRatio?: number;
    markPrice?: number;
    markRatio?: number;
    pnl?: number;
    unrealizedPnl?: number;
    unrealizedPnlPercentage?: number;
};

export type AgentWalletResponse = {
    address: string;
    status: string; // e.g. "created", "active", or separate field
    isApproved?: boolean; // Hypothetical, need to check response
};

export class PearApiClient {
    private client: AxiosInstance;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.request.use((config) => {
            if (!this.accessToken) {
                this.loadTokensFromStorage();
            }
            if (this.accessToken) {
                config.headers.Authorization = `Bearer ${this.accessToken}`;
            } else {
                console.warn("No access token found in PearApiClient");
            }
            return config;
        });
    }

    setTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken; // API Key flow might not need refresh, but good to keep structure
        if (typeof window !== 'undefined') {
            localStorage.setItem('pear_access_token', accessToken);
            localStorage.setItem('pear_refresh_token', refreshToken);
        }
    }

    loadTokensFromStorage() {
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('pear_access_token');
            this.refreshToken = localStorage.getItem('pear_refresh_token');
        }
    }

    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pear_access_token');
            localStorage.removeItem('pear_refresh_token');
        }
    }

    // --- Auth (API Key) ---

    async login(address: string, apiKey: string) {
        // POST /auth/login
        const payload = {
            method: 'api_key',
            address: address,
            clientId: CLIENT_ID,
            details: {
                apiKey: apiKey,
            },
        };
        const response = await this.client.post('/auth/login', payload);
        return response.data; // Expect { accessToken, refreshToken, ... }
    }

    // --- Agent Wallet ---

    async getAgentWallet() {
        // GET /agentWallet
        try {
            const response = await this.client.get('/agentWallet');
            return response.data;
        } catch (err) {
            // Return null or throw depending on how we want to handle "not found"
            // If 404, usually means none exists.
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                return null;
            }
            throw err;
        }
    }

    async createAgentWallet() {
        // POST /agentWallet
        const response = await this.client.post('/agentWallet', {});
        return response.data;
    }

    // --- Sanity Check ---

    async getAccounts() {
        const response = await this.client.get('/accounts');
        return response.data;
    }

    // --- Trading ---

    async createPosition(params: {
        longAssets: { asset: string; weight: number }[];
        shortAssets: { asset: string; weight: number }[];
        leverage: number;
        usdValue: number;
        executionType: 'MARKET' | 'LIMIT' | 'TWAP';
    }) {
        const payload = {
            executionType: params.executionType,
            slippage: 0.1, // Increased to 10% to prevent execution reverts
            leverage: params.leverage,
            usdValue: params.usdValue,
            longAssets: params.longAssets,
            shortAssets: params.shortAssets,
        };

        console.log("🚀 Sending createPosition payload:", JSON.stringify(payload, null, 2));
        console.log("🔑 Authorization:", this.accessToken ? "Token present" : "NO TOKEN!");

        try {
            const response = await this.client.post('/positions', payload);
            console.log("✅ Position created successfully:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ createPosition Error Response:", error.response?.data);
            console.error("❌ createPosition Status:", error.response?.status);
            console.error("❌ Full Error:", error.toJSON?.() || error);

            // Provide helpful error messages based on common issues
            let errorMessage = "Trade failed. ";
            if (error.response?.status === 500) {
                errorMessage += "Possible causes:\n";
                errorMessage += "1. Agent wallet not approved (check dashboard)\n";
                errorMessage += "2. Insufficient USDC for collateral\n";
                errorMessage += "3. Insufficient ETH for gas fees\n";
                errorMessage += "4. Invalid asset symbols\n";
                errorMessage += "\nCheck browser console for full payload details.";
            } else if (error.response?.status === 401) {
                errorMessage += "Authentication failed. Please re-login.";
            } else {
                errorMessage += error.response?.data?.message || error.message;
            }

            throw new Error(errorMessage);
        }
    }

    async getPositions(): Promise<Position[]> {
        const response = await this.client.get('/positions');
        return response.data;
    }

    async closePosition(positionId: string) {
        console.log("🔒 Closing position:", positionId);
        try {
            const response = await this.client.delete(`/positions/${positionId}`);
            console.log("✅ Position closed successfully:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ closePosition Error:", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to close position");
        }
    }

    async getPosition(positionId: string): Promise<Position> {
        const response = await this.client.get(`/positions/${positionId}`);
        return response.data;
    }
}

export const pearApi = new PearApiClient();
