'use client';

import React from 'react';
import { Plus, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdminTable from '@repo/ui/components/admin/AdminTable';
import AdminSearchBar from '@repo/ui/components/admin/AdminSearchBar';
import AdminActionButton from '@repo/ui/components/admin/AdminActionButton';
import { Prisma } from '@repo/database/index';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: { 
        orders: true,
        reviews: true,
        cartItems: true,
        wishlist: true
      }
    }
  }
}>;

interface UsersTableClientProps {
  users: UserWithCount[];
}

export default function UsersTableClient({ users }: UsersTableClientProps) {
  const columns = [
    {
      key: 'avatar' as keyof UserWithCount,
      header: 'User',
      cell: (user: UserWithCount) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={user.image || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`} 
              alt={user.name || user.email}
            />
            <AvatarFallback>
              {user.name ? user.name.split(' ').map(n => n[0]).join('') : user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No name'}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user: UserWithCount) => (
        <Badge 
          variant={user.role === 'ADMIN' ? 'default' : user.role === 'CUSTOMER' ? 'secondary' : 'outline'}
          className="capitalize"
        >
          {user.role?.toLowerCase() || 'customer'}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (user: UserWithCount) => (
        <div className="flex items-center space-x-2">
          <Badge 
            variant={user.emailVerified ? "default" : "secondary"}
            className="text-xs"
          >
            {user.emailVerified ? "Verified" : "Unverified"}
          </Badge>
          {user.emailVerified && (
            <Badge variant="outline" className="text-xs">
              Active
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user: UserWithCount) => (
        <AdminActionButton
          onEdit={() => (window.location.href = `/admin/users/edit/${user.id}`)}
          onView={() => (window.location.href = `/admin/users/${user.id}`)}
          customActions={[
            {
              label: user.emailVerified ? "Deactivate" : "Activate",
              icon: user.emailVerified ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />,
              onClick: () => console.log("Toggle user status", user.id),
              variant: user.emailVerified ? "destructive" : "default"
            }
          ]}
        />
      ),
    },
  ];

  const filterOptions = [
    {
      key: 'role',
      label: 'Role',
      options: [
        { value: 'CUSTOMER', label: 'Customer' },
        { value: 'ADMIN', label: 'Admin' },
        { value: 'SUPPORT', label: 'Support' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your user accounts and permissions</p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/users/invite">
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <AdminSearchBar
        onSearch={(searchTerm) => {
          console.log('Search users:', searchTerm);
        }}
        onFilterChange={(filters) => {
          console.log('Filter users:', filters);
        }}
        placeholder="Search users by name, email..."
        filters={filterOptions}
      />

      {/* Table */}
      <AdminTable
        data={users}
        columns={columns}
        cardTitle="Users"
        cardDescription="Your user management system"
        emptyMessage="No users found. Users will appear here when they register."
      />
    </div>
  );
}
