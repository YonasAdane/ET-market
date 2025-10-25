"use server";

import { db } from "app/lib/config/prisma-config";
import { revalidatePath } from "next/cache";

interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: 'CUSTOMER' | 'ADMIN' | 'SUPPORT';
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export async function getUsers(params: UserQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      role,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    const skip = (page - 1) * pageSize;
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Role filter
    if (role) {
      where.role = role;
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries in parallel
    const [users, totalCount] = await Promise.all([
      db.user.findMany({
        where,
        include: {
          _count: {
            select: { 
              orders: true,
              reviews: true,
              cartItems: true,
              wishlist: true
            }
          }
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      db.user.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        pageSize,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };

  } catch (error: any) {
    console.error("Error fetching users:", error);
    
    if (error?.message?.includes("Can't reach database") || error.code === "ECONNREFUSED") {
      return { 
        success: false,
        type: "network", 
        error: "Unable to connect to the database. Please check your network connection." 
      };
    }

    return { 
      success: false,
      type: "other", 
      error: "Something went wrong while fetching users. Please try again later." 
    };
  }
}

export async function getUserById(id: string) {
  try {
    if (!id) {
      return { success: false, error: "User ID is required" };
    }

    const user = await db.user.findUnique({ 
      where: { id }, 
      include: {
        orders: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
<<<<<<< HEAD
            items: {
              include: {
                product: {
                  include: { images: true },
=======
            orderItems: {
              include: {
                product: {
                  include: {
                    images: true
                  }
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
                }
              }
            }
          }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            product: true
          }
        },
        _count: {
          select: { 
            orders: true,
            reviews: true,
            cartItems: true,
            wishlist: true
          }
        }
      }
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

export async function updateUser(id: string, updateData: any) {
  try {
    if (!id) {
      return { success: false, error: "User ID is required" };
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name: updateData.name,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
        phoneNumber: updateData.phoneNumber,
        address: updateData.address,
        role: updateData.role,
        emailVerified: updateData.emailVerified ? new Date() : null,
      },
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
    });

    revalidatePath('/admin/users');
    return { success: true, data: updatedUser };

  } catch (error: any) {
    console.error("Error updating user:", error);
    
    if (error.code === 'P2002') {
      return { success: false, error: "Email already exists" };
    }
    
    return { success: false, error: "Failed to update user. Please try again." };
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id) {
      return { success: false, error: "User ID is required" };
    }

    // First, get the user with all related data
    const user = await db.user.findUnique({
      where: { id },
      include: {
        orders: true,
        reviews: true,
        cartItems: true,
        wishlist: true,
        accounts: true,
        sessions: true
      }
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if user has orders (prevent deletion of users with order history)
    if (user.orders.length > 0) {
      return { 
        success: false, 
        error: `Cannot delete user. They have ${user.orders.length} order(s) in the system. Consider deactivating the account instead.` 
      };
    }

    // Use a transaction to delete all related data
    await db.$transaction(async (prisma) => {
      // Delete related data
      await prisma.review.deleteMany({ where: { userId: id } });
      await prisma.shoppingCart.deleteMany({ where: { userId: id } });
      await prisma.wishlist.deleteMany({ where: { userId: id } });
      await prisma.account.deleteMany({ where: { userId: id } });
      await prisma.session.deleteMany({ where: { userId: id } });
      
      // Finally delete the user
      await prisma.user.delete({ where: { id } });
    });

    revalidatePath('/admin/users');
    return { success: true, message: "User deleted successfully" };

  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { 
      success: false, 
      error: "Failed to delete user. Please try again." 
    };
  }
}

export async function deactivateUser(id: string) {
  try {
    if (!id) {
      return { success: false, error: "User ID is required" };
    }

    // Instead of deleting, we can add an active field or use a soft delete approach
    // For now, we'll just return a message that this feature needs to be implemented
    return { 
      success: false, 
      error: "User deactivation feature needs to be implemented in the database schema" 
    };

  } catch (error: any) {
    console.error("Error deactivating user:", error);
    return { 
      success: false, 
      error: "Failed to deactivate user. Please try again." 
    };
  }
}
