import { getPermalink } from "./permalinks";

export const headerData = {
    links: [
        {
            text: "About",
            href: "/about",
        },
        {
            text: "Contact",
            href: "/contact",
        },
        {
            text: "Investors",
            links: [
                {
                    text: "Information",
                    href: getPermalink("/invest"),
                },
                {
                    text: "Process",
                    href: getPermalink("/invest/process"),
                },
                {
                    text: "Register",
                    href: getPermalink("/register/investor"),
                },
            ],
        },
        {
            text: "Owners",
            links: [
                { text: "Information", href: getPermalink("/owners") },
                {
                    text: "Process",
                    href: getPermalink("/owners/process"),
                },
                {
                    text: "Register",
                    href: getPermalink("/register/owner"),
                },
            ],
        },
        {
            text: "Exchange",
            href: "/exchange",
        },
    ],
};

export const footerData = {
    links: [
        {
            title: "Information",
            links: [
                { text: "About", href: getPermalink("/about") },
                { text: "Contact", href: getPermalink("/contact") },
                { text: "Exchange", href: getPermalink("/exchange") },
                { text: "Investors", href: getPermalink("/invest") },
                { text: "Owners", href: getPermalink("/owners") },
                { text: "Register", href: getPermalink("/register") },
            ],
        },
    ],
    secondaryLinks: [
        { text: "Terms", href: getPermalink("/terms") },
        { text: "Privacy Policy", href: getPermalink("/privacy") },
    ],
};
