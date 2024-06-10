import Image        from "next/image";
import HelloWorld                  from "@/components/HelloWorld";
import LLMPlusStructuredParserFlow from "@/components/LLMPlusStructuredParserFlow";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-repeating-bg">
        <div className={'min-w-5xl w-full rounded-3xl p-16 bg-opacity bg-gradient-to-tr from-[#ebf2f2] to-[#d3dfde]/80'}>
          <LLMPlusStructuredParserFlow/>
        </div>
      </main>
  );
}
