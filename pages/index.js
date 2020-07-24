import Head from 'next/head'
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Word Pairs Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
            <h1>
              <Link href="/">
                <a>
                  findPairs(
                  <img src="/words.png" className="wordsIcon" />)
                </a>
              </Link>
            </h1>
            <ul>
              <li>
                <Link href="/en/[lang]" as="/en/de">
                  <a>Practice German</a>
                </Link>
              </li>
              <li>
                <Link href="/en/[lang]" as="/en/es">
                  <a>Practice Spanish</a>
                </Link>
              </li>
            </ul>
      </main>
    </div>
  )
}
