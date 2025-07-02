
import React, { useState } from 'react';
import { SidebarHeader } from './navigation/SidebarHeader';
import { SidebarMenu } from './navigation/SidebarMenu';
import { SidebarFooter } from './navigation/SidebarFooter';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col h-full bg-gray-50 border-r border-gray-200 ${
        isExpanded ? 'w-64' : 'w-20'
      } transition-width duration-300`}
    >
      <SidebarHeader isExpanded={isExpanded} />
      <SidebarMenu />
      <SidebarFooter isExpanded={isExpanded} />
    </div>
  );
};

export default Sidebar;
