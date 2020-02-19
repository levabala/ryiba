import './DirRow.scss';

import React from 'react';

import { Dir } from '../../containers/Dirs';

export interface DirRowProps {
  dir: Dir;
}

const DirRow = ({ dir }: DirRowProps) => {
  return (
    <div styleName="dirRow">
      <span styleName="name">{dir.name}</span>
      <span styleName="calcs">
        {dir.calcs.map(calc => (
          <button styleName="calc" key={calc.name}>
            {calc.name}
          </button>
        ))}
      </span>
    </div>
  );
};

export default DirRow;
