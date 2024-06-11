'use client'

import {useState}                   from "react";
import {Label}                      from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
}                                   from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import data                         from '@/utils/data.json';
import cn                           from 'clsx';
import Plan, {RegimenItem}          from "@/components/Plan";
import {useStore}                   from "@/lib/globalStore";

type Solution = {
  name: string;
  description: string;
}

export default function LLMPlusStructuredParserFlow() {
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [fitnessGoal, setFitnessGoal] = useState<string>("");
  const [solutions, setSolutions] = useState([]);
  // const [LLM, setLLM] = useState<string>('openai');
  const [selectedSolution, setSelectedRoutine] = useState<string | null>(null);
  const [regimen, setRegimen] = useState<RegimenItem[] | null>(null);
  const LLM = useStore(state => state.sharedState);
  const setLLM = useStore(state => state.setSharedState);


  const onGetWorkoutsSubmit = async () => {
    if (level && fitnessGoal) {
      setIsLoading(true);
      const res = await fetch('/api/get-workouts', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:    JSON.stringify({level, fitnessGoal, LLM})
      });
      if (res.ok) {
        const data = await res.json();
        console.log({data});
        setSolutions(data?.response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(res.statusText);
      }
    }
  }

  const onWeeklyRegimenRequestSubmit = async (selection: string) => {
    if (level && selection) {
      setIsLoading(true);
      const res = await fetch('/api/get-weekly-regimen', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:    JSON.stringify({level, selection, LLM})
      });
      if (res.ok) {
        const data = await res.json();
        console.log({data});
        setRegimen(data?.response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(res.statusText);
      }
    }
  }

  const onReset = () => {
    setLevel('beginner');
    setFitnessGoal("");
    setSolutions([]);
    setSelectedRoutine(null);
    setRegimen(null);
  }

  return <div>
    {(solutions?.length > 0 && !selectedSolution || selectedSolution && regimen)  && <button className={'p-8'} onClick={onReset}>&lt; Back</button>}
    <div className={'w-full flex justify-center p-16'}>
      {solutions?.length === 0 && <div className={''}>
        <div className={'flex justify-center'}>
          <RadioGroup className={'flex space-x-2'} defaultValue="openai" onValueChange={(e: string) => {
            setLLM(e);
          }}>
            <span>LLM:</span>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="openai" id="openai"/>
              <Label htmlFor="openai">OpenAI (gpt-3.5-turbo)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anthropic" id="anthropic"/>
              <Label htmlFor="anthropic">Anthropic (claude-3-sonnet)</Label>
            </div>
          </RadioGroup>
        </div>
        <p className={'py-8 w-full font-semibold text-2xl min-h-[120px]'}>I am a {level} user looking for {fitnessGoal ? fitnessGoal : '...'} solutions.</p>

        <div className={'w-full py-4 flex justify-center'}>
          <div>
            <h2 className={'pb-2'}>Level:</h2>
            <div className={'pb-8'}>
              <RadioGroup defaultValue="beginner" onValueChange={(e: string) => setLevel(e as "beginner" | "intermediate" | "advanced")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner"/>
                  <Label htmlFor="beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate"/>
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced"/>
                  <Label htmlFor="advanced">Advanced</Label>
                </div>
              </RadioGroup>
            </div>

            <h2 className={'pb-2'}>Fitness Goal:</h2>
            <RadioGroup defaultValue={fitnessGoal} onValueChange={(e: string) => setFitnessGoal(e as string)}>
              {data?.map((name: string, idx: number) =>
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={name} id={name}/>
                    <Label htmlFor={name}>{name}</Label>
                  </div>
              )}
            </RadioGroup>
          </div>

        </div>


        <div className={'space-x-4 py-8 flex justify-center'}>
          <button disabled={isLoading} className={cn('bg-gray-600 hover:bg-gray-800 text-lg text-white rounded-md py-2 px-6', {
            "opacity-40": isLoading
          })} onClick={onReset}>Reset
          </button>

          <button disabled={!fitnessGoal || isLoading} className={cn('min-w-[170px] bg-[#1d7a83] hover:bg-[#24969b] text-lg text-white rounded-md py-2 px-6', {
            "opacity-40": !fitnessGoal || isLoading
          })} onClick={onGetWorkoutsSubmit}>{isLoading ? 'calling LLM...' : 'Find Solutions'}
          </button>

        </div>
      </div>}

      {solutions?.length > 0 && !selectedSolution &&
        <div className={'grid grid-cols-2 gap-4'}>
          {solutions?.map((item: Solution, idx: number) => (<Card key={idx} className="w-[350px]">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className={'pb-2'}>{item.description}</CardDescription>
              <CardContent>
                <div className={'w-full flex justify-center'}>
                  <button onClick={async () => {
                    console.log('click', item.name);
                    setSelectedRoutine(item.name);
                    await onWeeklyRegimenRequestSubmit(item.name);
                  }}
                          className={'w-full bg-[#bd70a6] hover:bg-[#dc83c1] text-lg text-white rounded-md py-2 px-6'}>Select
                  </button>
                </div>

              </CardContent>
            </CardHeader>
          </Card>))}
        </div>
      }

      {isLoading && selectedSolution && <p>Creating regimen...</p>}
      {selectedSolution && regimen && <div>
        <Plan regimen={regimen} selectedSolution={selectedSolution}/>
      </div>
      }


    </div>
  </div>

}
