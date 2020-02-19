import { emulateLatency } from '../assembly/latency';
import { CalcState } from '../containers/Dirs';
import { setCalcState } from './FetchDirs';

export async function fetchCalcResult(dirName: string, calcName: string) {
  setCalcState(dirName, calcName, CalcState.Downloading);

  await emulateLatency(1000, 4000);

  setCalcState(dirName, calcName, CalcState.Downloaded);

  console.log(`downloaded ${dirName}:${calcName}`);
}
