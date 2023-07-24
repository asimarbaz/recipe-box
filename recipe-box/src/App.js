import './App.css';
import RecipeList from './RecipeList';
import { FireOutlined } from '@ant-design/icons';

function App() {

  return (
    <div className="App">
      <h2 className='logo'><FireOutlined style={{margin:"0 15px"}}/>Recipe Box</h2>
      <RecipeList />
    </div>
  );
}

export default App;