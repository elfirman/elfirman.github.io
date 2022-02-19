import type { AppProps } from "next/app";

import { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import { useRouter } from "next/router";

import "../styles/globals.css";
import "../styles/aos_custom.css";
import "../styles/illustrations_custom.css";
import "aos/dist/aos.css";
import "animate.css";

import ScrollToTop from "@/components/ScrollToTopButton";
import MetaTags from "@/components/MetaTags";

const metaData = {
    title: "Ismail Firman - a student",
    description: "Hello! I’m Ismailfirman, a android developer, designer, and owner lapakgrafi.com, from Indonesia.",
    url: "https://ismailfirman.tech",
    image: "https://ismailfirman.tech/images/banner.png",
    themeColor: "#ffffff",
    keywords: "ismail, firman, ui, ux, programmer, developer, backend, frontend, designer, indonesia, website, producer, fullstack, freelance, freelancer",
    author: "Ismail Firman",
    charSet: "utf-8",
    language: "English",
    icons: [
        {
            src: "/favicon.ico",
            sizes: "16x16",
            type: "image/ico",
        },
        {
            src: "/favicon.ico",
            sizes: "32x32",
            type: "image/ico",
        },
        {
            src: "/favicon.ico",
            sizes: "64x64",
            type: "image/ico",
        },
        {
            src: "/favicon.ico",
            sizes: "128x128",
            type: "image/ico",
        },
    ],
};

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        document.documentElement.lang = "en-us";

        AOS.init({
            easing: "ease-out-cubic",
            startEvent: "DOMContentLoaded",
            offset: 50,
            delay: 200,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        const bodyClass = document.body.classList;

        const routeChangeStartHandler = () => {
            bodyClass.add("body-fadeOut");
        };

        const routeChangeCompleteHandler = () => {
            bodyClass.remove("body-fadeOut");
            bodyClass.add("body-fadeIn");
            setTimeout(() => bodyClass.remove("body-fadeIn"), 1000);
        };

        router.events.on("routeChangeStart", routeChangeStartHandler);
        router.events.on("routeChangeComplete", routeChangeCompleteHandler);

        return () => {
            router.events.off("routeChangeStart", routeChangeStartHandler);
            router.events.off("routeChangeComplete", routeChangeCompleteHandler);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <title>{metaData.title}</title>
                <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" />
                <MetaTags metaData={metaData} />
            </Head>

            <ScrollToTop>
                <Component {...pageProps} id="component" />
            </ScrollToTop>
        </>
    );
}
