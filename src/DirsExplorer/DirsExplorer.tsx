import './DirsExplorer.scss';

import React from 'react';

import { DirsContainer } from '../containers/Dirs';
import DirRow from './DirRow';

const DirsExplorer = () => {
  const { dirsList } = DirsContainer.useContainer();

  return (
    <div styleName="dirsExplorer">
      {dirsList.map(dir => (
        <DirRow dir={dir} key={dir.name} />
      ))}
    </div>
  );
};

export default DirsExplorer;
