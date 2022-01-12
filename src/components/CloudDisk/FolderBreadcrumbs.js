import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../../hooks/useFolder';

// 面包屑
export default function FolderBreadcrumbs({currentFolder}) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  // if (currentFolder) path = [...path, ...currentFolder.path]
  console.log('currentFolder', currentFolder);
  console.log('currentFolder.path', currentFolder?.path);

  return (
    <Breadcrumb>
    {/* {
      path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
        >
        {folder.name}
        </Breadcrumb.Item>
      ))
    } */}
    {
      currentFolder && (
        <Breadcrumb.Item>
          {currentFolder.name}
        </Breadcrumb.Item>
      )
    }
    </Breadcrumb>
  )
}
