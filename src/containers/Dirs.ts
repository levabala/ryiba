import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { randomBool } from '../assembly/random';
import { shell } from '../assembly/utility';

export interface DirCalc {
  name: string;
  calculated: boolean;
  calc: () => void;
}

export interface Dir {
  name: string;
  calcs: DirCalc[];
}

export const DirsContainer = createContainer(() => {
  const [dirsList, setDirsList] = useState<Dir[]>(
    shell(20).map(
      (_, i) =>
        ({
          name: `dir${i}`,
          calcs: [
            { name: "HIGH", calculated: randomBool(), calc: () => null },
            { name: "LOW", calculated: randomBool(), calc: () => null },
            { name: "PSD", calculated: randomBool(), calc: () => null }
          ]
        } as Dir)
    )
  );

  return { dirsList, setDirsList };
});
