import React, { Suspense } from "react";
import { Plus, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { getUsers } from "../_actions/userAction";
import AdminTable from "@repo/ui/components/admin/AdminTable";
import AdminPagination from "@repo/ui/components/admin/AdminPagination";
import AdminSearchBar from "@repo/ui/components/admin/AdminSearchBar";
import AdminActionButton from "@repo/ui/components/admin/AdminActionButton";
import { Badge } from "@repo/ui/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import TryAgainButton from "app/components/try-again-button";
import { Prisma } from "@repo/database/index";
import UsersTableClient from "./UsersTableClient";

// Loading skeleton component
function UsersLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default async function UsersPage() {
  return (
    <Suspense fallback={<UsersLoadingSkeleton />}>
      <UsersContent />
    </Suspense>
  );
}

async function UsersContent() {
  const result = await getUsers();
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
  
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Failed to load users</h3>
          <p className="text-muted-foreground max-w-md">{result.error}</p>
        </div>
        <TryAgainButton/>
      </div>
    );
  }

  const { data: users } = result;

  // Define table columns


  // Filter options
  const filterOptions = [
    {
      key: "role",
      label: "Role",
      options: [
        { value: "CUSTOMER", label: "Customer" },
        { value: "ADMIN", label: "Admin" },
        { value: "SUPPORT", label: "Support" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Users Table */}
      <div className="p-6">
      <UsersTableClient users={result.data || []} />
    </div>
    
      {/* TODO: Add pagination when needed */}
    </div>
  );
}
