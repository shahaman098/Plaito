import { useState, useEffect } from 'react';
import { pearApi } from '@/lib/pear-api';
import { useAccount } from 'wagmi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePearAuth() {
    const { address } = useAccount();
    const queryClient = useQueryClient();
    const [apiKey, setApiKey] = useState('10f9ecdd43734f3c9c384a27ff843fc761914f5a7b272b2c91cd7f3910c6de26');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initial check
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('pear_access_token');
            if (token) {
                pearApi.loadTokensFromStorage();
                setIsLoggedIn(true);
            }
        }
    }, []);

    const loginMutation = useMutation({
        mutationFn: async () => {
            if (!address) throw new Error("No wallet connected");
            if (!apiKey) throw new Error("API Key required");
            const response = await pearApi.login(address, apiKey);
            pearApi.setTokens(response.accessToken, response.refreshToken);
            return response;
        },
        onSuccess: () => {
            setIsLoggedIn(true);
            queryClient.invalidateQueries({ queryKey: ["agentWallet"] });
        }
    });

    const agentQuery = useQuery({
        queryKey: ['agentWallet', address],
        queryFn: () => pearApi.getAgentWallet(),
        enabled: isLoggedIn,
        retry: false,
    });

    const createAgentMutation = useMutation({
        mutationFn: () => pearApi.createAgentWallet(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agentWallet"] });
        }
    });

    return {
        apiKey,
        setApiKey,
        isLoggedIn,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        agentWallet: agentQuery.data,
        isLoadingAgent: agentQuery.isLoading,
        createAgent: createAgentMutation.mutate,
        isCreatingAgent: createAgentMutation.isPending
    };
}
