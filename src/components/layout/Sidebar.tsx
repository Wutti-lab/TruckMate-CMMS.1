
import React from 'react';
import { 
  Sidebar as SidebarPrimitive, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarRail 
} from '@/components/ui/sidebar';
import { SidebarHeader } from './navigation/SidebarHeader';
import { AppSidebarMenu } from './navigation/SidebarMenu';
import { SidebarFooter } from './navigation/SidebarFooter';

const Sidebar = () => {
  return (
    <SidebarPrimitive 
      variant="sidebar" 
      collapsible="offcanvas"
      className="border-r border-sidebar-border bg-sidebar"
    >
      <SidebarContent className="gap-0">
        <SidebarHeader />
        
        <SidebarGroup className="flex-1">
          <SidebarGroupContent className="px-2">
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarFooter />
      </SidebarContent>
      <SidebarRail />
    </SidebarPrimitive>
  );
};

export default Sidebar;
