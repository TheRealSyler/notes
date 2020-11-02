import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/compat';
import { remote } from 'electron';

export const SelectDirectory: FunctionComponent = () => {
  const [path, setPath] = useState<null | string>(null);
  console.log(path, !!path);
  return (
    <div>
      {path}
      <button
        className="btn"
        onClick={async () => {
          const a = await remote.dialog.showOpenDialog({
            title: 'Select Notes Directory',
            properties: ['openDirectory']
          });

          // await promises.writeFile(filename, 'awdawd');
          setPath(a.filePaths[0]);
          console.log('awd', a);
        }}
      >
        Select
      </button>
      <br />
      <button className="btn" disabled={!path} onClick={() => console.log('aWd')}>
        Ok
      </button>
    </div>
  );
};
