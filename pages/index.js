import Head from "next/head";
import AnimeSearch from './AnimeSearch';
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <link rel="stylesheet" src="./global.css" />
      <Head>
        <title>AniSearch</title>
        <meta author="Jewel" content="A Next.js app" />
        <link rel="icon" href="/animelogo.png" />
      </Head>
      <AnimeSearch />
      <Footer />
    </div>
  );
}
