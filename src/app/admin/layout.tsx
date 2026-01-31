'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/providers', label: 'Providers', icon: Briefcase },
    { href: '/admin/users', label: 'Users', icon: Users },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent className="flex flex-col">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2">
                <AppLogo className="w-8 h-8" />
                <span className="text-lg font-headline font-semibold">LocalSeva</span>
              </Link>
            </SidebarHeader>

            <SidebarMenu className="flex-1 px-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <SidebarFooter>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start items-center gap-2 p-2 h-auto"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/admin/100/100" data-ai-hint="person face" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden group-data-[state=expanded]:block">
                      <p className="font-semibold text-sm">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@localseva.co</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className="ml-auto hidden group-data-[state=expanded]:block"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 bg-secondary/50 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center mb-6">
            <SidebarTrigger className="md:hidden mr-4" />
            <h1 className="text-2xl font-bold font-headline">
              {menuItems.find((item) => item.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
