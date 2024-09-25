import { Drawer, styled } from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 260,
        backgroundColor: '#2E3B55',
        color: '#fff',
        boxShadow: '5px 0 15px rgba(0,0,0,0.2)',
    },
}));