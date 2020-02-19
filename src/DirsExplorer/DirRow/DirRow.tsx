import './DirRow.scss';

import classnames from 'classnames';
import React from 'react';

import { CalcState, Dir } from '../../containers/Dirs';

export interface DirRowProps {
  dir: Dir;
  requestCalculation: (calcType: string) => void;
  downloadResult: (calcType: string) => void;
}

const calcState2Class: Record<CalcState, string> = {
  [CalcState.Done]: "done",
  [CalcState.ProcessingRequested]: "processingRequested",
  [CalcState.InProcess]: "inProcess",
  [CalcState.Missing]: "missing",
  [CalcState.Downloading]: "downloading",
  [CalcState.Downloaded]: "downloaded"
};

const DirRow = ({ dir, requestCalculation, downloadResult }: DirRowProps) => {
  return (
    <div styleName="dirRow">
      <span styleName="name">{dir.name}</span>
      <span styleName="calcs">
        {dir.calcs.map(calc => (
          <button
            styleName={classnames("calc", calcState2Class[calc.state])}
            key={calc.name}
            onClick={e => {
              const calcType = (e.target as HTMLButtonElement).innerText;
              switch (calc.state) {
                case CalcState.Done:
                  downloadResult(calcType);
                  break;
                // case CalcState.Downloading:
                //   downloadResult(calcType)
                //   break;

                default:
                  requestCalculation(calcType);
                  break;
              }
            }}
          >
            {calc.name}
          </button>
        ))}
      </span>
    </div>
  );
};

export default DirRow;
