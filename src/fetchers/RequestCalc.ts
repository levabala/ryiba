import { emulateLatency } from '../assembly/latency';
import { CalcState } from '../containers/Dirs';
import { setCalcState } from './FetchDirs';

export async function* requestCalc(dirName: string, calcName: string) {
  await emulateLatency(0, 500);

  setCalcState(dirName, calcName, CalcState.InProcess);

  yield "processing started";

  await emulateLatency(1000, 2000);

  setCalcState(dirName, calcName, CalcState.Done);

  yield "processing completed";

  console.log(`calculation for ${dirName}:${calcName} done`);
}
