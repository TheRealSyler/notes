import { h, FunctionComponent } from 'preact';
import { remote } from 'electron';
import './titleBar.sass';

export const TitleBar: FunctionComponent = () => {
  const win = remote.getCurrentWindow();
  return (
    <div className="title-bar">
      <div />
      <span>{document.title}</span>
      <div>
        <button className="title-bar-btn title-bar-min-btn" onClick={() => win.minimize()} />
        <button className="title-bar-btn" onClick={() => win.setAlwaysOnTop(!win.isAlwaysOnTop())}>
          TODO
        </button>
        <button className="title-bar-btn title-bar-close-btn" onClick={() => win.close()} />
      </div>
    </div>
  );
};
