import { createSlice } from "@reduxjs/toolkit";
import { fetchAgents } from "./agentsThunk";

interface AgentsState {
    agents: any[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: AgentsState = {
    agents: [],
    loading: false,
    error: null,
    total: 0,
};

export const agentsSlice = createSlice({
    name: "agents",
    initialState,
    reducers: {
        updateAgentStatus: (state, action: { payload: { id: any; isActive: boolean } }) => {
            const { id, isActive } = action.payload;
            const agent = state.agents.find(a => a.agentId === id);
            if (agent) {
                agent.status = isActive ? "active" : "inactive";
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.agents = action.payload?.data?.agents as any[];
                state.total = action.payload?.data?.meta?.total || 0;
            })
            .addCase(fetchAgents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { updateAgentStatus } = agentsSlice.actions;
export default agentsSlice.reducer;
