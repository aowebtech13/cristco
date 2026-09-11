import { href } from "react-router-dom";

export const menuData = [
  {
    id: 1,
    title: "Dashboard",
    icon: "icon-category",
    hasChildren: false,
    href: "/"
    
  },
  {
    id: 2,
    title: "My Wallet",
    icon: "icon-wallet1",
    hasChildren: true,
    subMenu: [
      { text: "My Wallet", href: "/my-wallet" },
      { text: "Account", href: "/account" },
    ],
  },
  {
    title: "Transaction",
    icon: "svg",
    href: "/transaction",
  },
  {
    title: "Crypto",
    icon: "icon-dash1",
    href: "/crypto",
  },
  {
    title: "Exchange",
    icon: "icon-arrow-swap",
    href: "/exchange",
  },
  {
    title: "Settings",
    icon: "icon-setting1",
    href: "/settings",
  },
  
];
