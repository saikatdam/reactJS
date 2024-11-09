import { useState, FC } from "react";

interface ExplorerNode {
  id: string;
  name: string;
  isFolder: boolean;
  items?: ExplorerNode[];
}

interface FolderProps {
  explorer: ExplorerNode;
  handleInsertNode: (id: string, name: string, isFolder: boolean) => void;
}

interface StateProps {
  visible: boolean;
  isFolder: boolean | null;
}

const Folder: FC<FolderProps> = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<StateProps>({
    visible: false,
    isFolder: null,
  });

 const addNewFile = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key == "Enter" && e.currentTarget.value){
        handleInsertNode(explorer.id,e.currentTarget.value,showInput.isFolder!);
        setShowInput({...showInput,visible:false});
    }

 }

  const handleFolder = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleFolder(e, true)}>Folder</button>
            <button onClick={(e) => handleFolder(e, false)}>File</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 33 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={(e) => addNewFile(e)}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="inputContainer_1"
              />
            </div>
          )}

          {explorer.items?.map((exp) => (
            <Folder key={exp.id} handleInsertNode={handleInsertNode} explorer={exp} />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
