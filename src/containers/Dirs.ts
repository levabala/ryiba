import { Map } from 'immutable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';

import { fetchDir, fetchDirs } from '../fetchers/FetchDirs';
import { requestCalc } from '../fetchers/RequestCalc';

export enum CalcState {
  InProcess,
  Missing,
  Done
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

  const requestCalculation = async (dirName: string, calcName: string) => {
    console.log(`requestCalculation for ${dirName}:${calcName}`);
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
              state: CalcState.InProcess
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

    // set "isProcessing"
    setDirsMap(newDirsList);

    await requestCalc(dirName, calcName);
    const updatedDir = await fetchDir(dirName);
    updateDir(updatedDir);
  };

  return { dirsList, requestCalculation };
});
