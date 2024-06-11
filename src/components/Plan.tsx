export type RegimenItem = {
  day: string;
  instructions: string[];
}
type Props = {
  regimen: RegimenItem[];
  selectedSolution: string;
}

const Plan = ({regimen, selectedSolution}: Props) => {
  console.log({selectedSolution});
  return (<div className={'max-w-3xl'}>
    <h1 className={'text-xl font-bold w-full text-center pb-4'}>My Regimen for {selectedSolution}:</h1>
    <div>
      {(regimen ?? []).map(({day, instructions}: RegimenItem, idx: number) => (<div key={idx} className={'py-2 flex'}>
        <div className={'font-bold pr-2 w-fit flex-shrink-0'}>{day}:</div>

        <ul>{instructions?.map((inst: string, idx) => (<li key={idx}>{inst}</li>))}</ul>
      </div>))}
    </div>
  </div>)
};

export default Plan;
