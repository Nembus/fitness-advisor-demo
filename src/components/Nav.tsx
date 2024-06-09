import React from "react";
import Link  from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
      <>
        <div className="w-full h-20 bg-teal-800/20 sticky top-0 ">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <Link href="/">
                <Image width={'180'} height={'52'} src={'/logo.svg'} alt={'logo'} />
              </Link>
              <ul className="hidden md:flex gap-x-6 text-gray-800">
                <li>
                  <Link href="/">
                    <p>LLM + structured output parser</p>
                  </Link>
                </li>
                <li>
                  <Link href="/llm-rag">
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
