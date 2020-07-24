import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//use SWR React Hooks library for remote date-fetching
import useSWR from "swr";
import Game from "../../components/game";

const fetcher = (lang) =>
  fetch(`/api/data?lang=${lang}`).then((response) => response.json());

export default function LandPage() {
    const { query } = useRouter();
    const {data, error} = useSWR(query.lang, fetcher);
    if (error) return <h1>Error...</h1>;
    if (!data) return <h1>Loading...</h1>;

    return (
        <main>
          <h1>
            <Link href="/">
              <a>
                <img src="/words.png" className="wordsIcon"/>
              </a>
            </Link>
          </h1>
          <Game pairs={data.pairs} langA={data.langA} langB={data.langB} />
        </main>
      );
}

