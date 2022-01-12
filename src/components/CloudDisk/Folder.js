import React from 'react'
import { FolderFilled } from '@ant-design/icons';
import {Link} from 'react-router-dom';

export default function Folder({folder}) {
  return (
    <Link to={`${folder.id}`}>
      <button className="btn btn--file">
        <FolderFilled />
        {folder && folder.name}
      </button>
    </Link>
  )
}
