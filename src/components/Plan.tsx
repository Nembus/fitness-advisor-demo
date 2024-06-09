export type RegimenItem = {
  day: string;
  instructions: string;
}
type Props = {
  regimen: RegimenItem[];
}

const Plan = ({regimen}: Props) => {
  return (<div className={'max-w-3xl'}>
    <h1 className={'text-xl font-bold'}>My Regimen:</h1>
    <div>
      {(regimen ?? []).map(({day, instructions}: RegimenItem, idx: number) => (<div key={idx} className={'py-2 flex'}>
        <div className={'font-bold pr-2 w-fit flex-shrink-0'}>{day}:</div>
        <div>{instructions}</div>
      </div>))}
    </div>
  </div>)
};

export default Plan;
