import React from 'react';
import AddFolderButton from './AddFolderButton';
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useFolder } from '../../hooks/useFolder';
import { useParams } from "react-router-dom";

export default function CloudDisk() {
  let {folderId} = useParams();
  // useFolder 传入的id是父文件的id
  const { folder, childFolders } = useFolder(folderId);
  // console.log('childFolders', childFolders);
  // console.log('state', useFolder('ZAlOJ4NRsv7MAUoifcas'));
  return (
    <>
      <FolderBreadcrumbs currentFolder={folder} />
      <AddFolderButton currentFolder={folder} />
      {childFolders?.length > 0 && (
        <div>
          {childFolders.map(childFolder => (
            <div key={childFolders.id}>
              <Folder folder={childFolder} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
