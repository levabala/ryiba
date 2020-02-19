import { Map } from 'immutable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';

import { fetchCalcResult } from '../fetchers/FetchCalcResult';
import { fetchDir, fetchDirs } from '../fetchers/FetchDirs';
import { requestCalc } from '../fetchers/RequestCalc';

export enum CalcState {
  Missing,
  ProcessingRequested,
  InProcess,
  Calculated,
  Downloading,
  Downloaded
}

export interface DirCalc {
  name: string;
  state: CalcState;
}

export interface Dir {
  name: string;
  calcs: DirCalc[];
}

export const DirsContainer = createContainer(() => {
  const [dirsMap, setDirsMap] = useState(Map<string, Dir>());
  const dirsMapActual = useRef(dirsMap);
  dirsMapActual.current = dirsMap;

  const dirsList = Array.from(dirsMap.values());

  // initial fetching
  useEffect(() => {
    (async () => setDirsMap(await fetchDirs()))();
  }, []);

  const updateDir = (dir: Dir) => {
    const { current: dirs } = dirsMapActual;
    setDirsMap(dirs.set(dir.name, dir));
  };

  const downloadResult = async (dirName: string, calcName: string) => {
    console.log(`request downloading for ${dirName}:${calcName}`);
    const dir = dirsMap.get(dirName) as Dir;
    const newDir: Dir = {
      name: dir.name,
      calcs: dir.calcs.map(calc =>
        calc.name === calcName
          ? ({ name: calc.name, state: CalcState.Downloading } as DirCalc)
          : calc
      )
    };
    updateDir(newDir);

    await fetchCalcResult(dirName, calcName);

    const updatedDir = await fetchDir(dirName);
    updateDir(updatedDir);
  };

  const requestCalculation = async (dirName: string, calcName: string) => {
    const [newDirsList, needCalculation] = dirsList.reduce(
      ([dirs, needCalc], dir) => {
        if (dir.name !== dirName)
          return [dirs.set(dir.name, dir), needCalc] as [
            Map<string, Dir>,
            boolean
          ];

        const [calcs, needCalc2] = dir.calcs.reduce(
          ([calcs, needCalc2], calc) => {
            if (calc.name !== calcName || calc.state !== CalcState.Missing)
              return [[...calcs, calc], needCalc2] as [DirCalc[], boolean];

            const newDirCalc: DirCalc = {
              name: calc.name,
              state: CalcState.ProcessingRequested
            };
            return [[...calcs, newDirCalc], true] as [DirCalc[], boolean];
          },

          [[], false] as [DirCalc[], boolean]
        );

        return [dirs.set(dir.name, { name: dir.name, calcs }), needCalc2] as [
          Map<string, Dir>,
          boolean
        ];
      },
      [Map(), false] as [Map<string, Dir>, boolean]
    );

    if (!needCalculation) return;
    console.log(`requestCalculation for ${dirName}:${calcName}`);

    // set "isProcessing"
    setDirsMap(newDirsList);

    const calcIterator = requestCalc(dirName, calcName);

    console.log(await calcIterator.next());
    updateDir(await fetchDir(dirName));

    console.log(await calcIterator.next());
    updateDir(await fetchDir(dirName));
  };

  return { dirsList, requestCalculation, downloadResult };
});
