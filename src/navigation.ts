import { getPermalink } from "./utils/permalinks";

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
            ],
        },

        {
            text: "Owners",
            links: [
                {
                    text: "Information",
                    href: getPermalink("/owners/info"),
                },
                {
                    text: "Process",
                    href: getPermalink("/owners/process"),
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
            ],
        },
    ],
    secondaryLinks: [
        { text: "Terms", href: getPermalink("/terms") },
        { text: "Privacy Policy", href: getPermalink("/privacy") },
    ],
    socialLinks: [
        // { ariaLabel: 'X', icon: 'tabler:brand-x', href: getPermalink('/owners/process') },
        // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: getPermalink('/owners/process') },
        // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: getPermalink('/owners/process') },
        // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
        // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
    ],
};
