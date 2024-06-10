'use client'

import React      from "react";
import Link       from "next/link";
import Image      from "next/image";
import {useStore} from "@/lib/globalStore";

const Nav = () => {
  const sharedState = useStore(state => state.sharedState);
  return (
      <>
        <div className="w-full h-24 bg-[#d3dfde] sticky top-0 ">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <div>
                <Link href="/">
                  <Image width={'180'} height={'52'} src={'/logo.svg'} alt={'logo'}/>
                </Link>
                {sharedState && <span className={'text-xs'}>
                    powered by: {sharedState}
                  </span>}
              </div>


              <ul className="hidden md:flex gap-x-6 text-gray-800">
                <li>
                  <Link href="/">
                    <p>LLM + structured output parser</p>
                  </Link>
                </li>
                <li>
                  <Link className={'text-gray-500'} href="/llm-rag">
                    <p>LLM + RAG</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
  );
};

export default Nav;
