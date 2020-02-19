import './DirRow.scss';

import classnames from 'classnames';
import React from 'react';

import { CalcState, Dir } from '../../containers/Dirs';

export interface DirRowProps {
  dir: Dir;
  requestCalculation: (calcType: string) => void;
}

const calcState2Class: Record<CalcState, string> = {
  [CalcState.Done]: "done",
  [CalcState.InProcess]: "inProcess",
  [CalcState.Missing]: "missing"
};

const DirRow = ({ dir, requestCalculation }: DirRowProps) => {
  return (
    <div styleName="dirRow">
      <span styleName="name">{dir.name}</span>
      <span styleName="calcs">
        {dir.calcs.map(calc => (
          <button
            styleName={classnames("calc", calcState2Class[calc.state])}
            key={calc.name}
            onClick={e =>
              requestCalculation((e.target as HTMLButtonElement).innerText)
            }
          >
            {calc.name}
          </button>
        ))}
      </span>
    </div>
  );
};

export default DirRow;
