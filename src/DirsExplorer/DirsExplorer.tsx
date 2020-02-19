import './DirsExplorer.scss';

import React from 'react';

import { DirsContainer } from '../containers/Dirs';
import DirRow from './DirRow';

const DirsExplorer = () => {
  const { dirsList, requestCalculation } = DirsContainer.useContainer();

  return (
    <div styleName="dirsExplorer">
      {dirsList.map(dir => {
        const requestCalculationLocal = (calcType: string) =>
          requestCalculation(dir.name, calcType);

        return (
          <DirRow
            dir={dir}
            key={dir.name}
            requestCalculation={requestCalculationLocal}
          />
        );
      })}
    </div>
  );
};

export default DirsExplorer;
