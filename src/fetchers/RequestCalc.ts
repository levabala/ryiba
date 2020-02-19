import { emulateLatency } from '../assembly/latency';
import { CalcState, Dir, DirCalc } from '../containers/Dirs';
import { mockedState } from './FetchDirs';

export async function requestCalc(dirName: string, calcName: string) {
  await emulateLatency(0, 1000);

  mockedState.set(dirName, {
    name: dirName,
    calcs: (mockedState.get(dirName) as Dir).calcs.map(calc =>
      calc.name === calcName
        ? ({ name: calc.name, state: CalcState.InProcess } as DirCalc)
        : calc
    )
  });

  await emulateLatency(1000, 2000);

  const dir = mockedState.get(dirName) as Dir;
  mockedState.set(dirName, {
    name: dirName,
    calcs: dir.calcs.reduce((calcs, calc) => {
      if (calc.name !== calcName) return [...calcs, calc];

      const newDirCalc: DirCalc = {
        name: calc.name,
        state: CalcState.Done
      };
      return [...calcs, newDirCalc];
    }, [] as DirCalc[])
  });

  console.log(`calculation for ${dirName}:${calcName} done`);
}
