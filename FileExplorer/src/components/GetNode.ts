interface TreeNode {
    id: string;
    name: string;
    isFolder: boolean;
    items?: TreeNode[];
  }
  
  const GetNode = () => {
    function insertNode(
      tree: TreeNode,
      id: string,
      isFolder: boolean,
      item: string
    ): TreeNode {
      // If we find the folder, add the new node (file or folder) under it
      if (tree.id === id) {
        const newNode: TreeNode = {
          id: new Date().getTime().toString(), // Generate unique id for each item
          name: item,
          isFolder,
          items: isFolder ? [] : undefined, // Only folders get an "items" array
        };
  
        // If there are items, push the new node to the list of items, else create a new list
        return {
          ...tree,
          items: tree.items ? [newNode, ...tree.items] : [newNode],
        };
      }
  
      // Recursively check all items inside the folder
      if (tree.items) {
        const updatedItems = tree.items.map((child) =>
          insertNode(child, id, isFolder, item)
        );
        return { ...tree, items: updatedItems };
      }
  
      return tree; // Return the tree unchanged if the id wasn't found
    }
  
    return { insertNode };
  };
  
  export default GetNode;
  