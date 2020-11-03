import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/compat';
import { remote } from 'electron';
import { readdirSync, statSync } from 'fs';
import { store } from '../../App';
import './selectDirectory.sass';

export const SelectDirectory: FunctionComponent = () => {
  const [path, setPath] = useState<null | string>(null);
  let isOkBtnDisabled = !path;
  let errorMessage = '';
  console.log(path, !!path);
  if (path) {
    if (!statSync(path).isDirectory()) {
      isOkBtnDisabled = true;
      errorMessage = 'Path is not a directory.';
    } else if (readdirSync(path).length !== 0) {
      isOkBtnDisabled = true;
      errorMessage = 'The selected directory has to be empty.';
    }
  }
  return (
    <div class="select-directory">
      <span class="select-directory-text">Select the Notes directory</span>

      <span class="select-directory-text">
        Selected Path:{' '}
        <span style="color: var(--text-faint)">{path ? path : 'no path selected'} </span>
      </span>
      <span class="select-directory-error">{errorMessage}</span>
      <div class="select-directory-buttons">
        <button
          className="btn btn-active select-directory-button"
          onClick={async () => {
            const { filePaths } = await remote.dialog.showOpenDialog({
              title: 'Select Notes Directory',
              properties: ['openDirectory']
            });

            setPath(filePaths[0]);
          }}
        >
          Select
        </button>

        <button
          class="btn btn-active select-directory-button"
          disabled={isOkBtnDisabled}
          onClick={() => {
            store.set('path', path!); // this button is disabled when the path is null
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};
