import Image        from "next/image";
import HelloWorld                  from "@/components/HelloWorld";
import LLMPlusStructuredParserFlow from "@/components/LLMPlusStructuredParserFlow";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={'min-w-5xl w-full rounded-3xl p-16 bg-opacity-50 bg-gradient-to-tr from-[#b3cbc9]/50 to-[#e2f0ef]/50'}>
          <LLMPlusStructuredParserFlow/>
        </div>
      </main>
  );
}
