import {LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut} from "react-icons/lu";

export const SIDE_MENU_DATA =[
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        to: "/dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        to: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        to: "/expenses"
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        to: "logout"
    }
]