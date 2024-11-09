import { useState } from 'react';
import './App.css';
import explorerData from './data/folderData';
import Folder from './components/Folder';
import GetNode from './components/GetNode';

interface ExplorerNode {
  id: string;
  name: string;
  isFolder: boolean;
  items?: ExplorerNode[];
}

const App = () => {
  const { insertNode } = GetNode();

  const [exploreData, setExploreData] = useState<ExplorerNode>(explorerData);

  const handleInsertNode = (folderId: string, item: string, isFolder: boolean) => {
    const finalResult = insertNode(exploreData, folderId, isFolder, item);
    console.log("Final result after insertNode:", finalResult); // Log final result for debugging
    setExploreData(finalResult); // Update state to trigger re-render
  };

  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={exploreData} />
    </div>
  );
};

export default App;
