import { h } from 'preact';
import Home from './views/home/Home';
import Store from 'electron-store';
export const store = new Store<{ path: string }>();
store.clear();
import './App.sass';
import { TitleBar } from './titleBar';
import { SelectDirectory } from './views/selectDirectory/selectDirectory';

const App = () => {
  console.log(store.get('path'));

  return (
    <div className="app">
      <TitleBar />

      {store.get('path') ? <Home /> : <SelectDirectory />}
    </div>
  );
};

export default App;
