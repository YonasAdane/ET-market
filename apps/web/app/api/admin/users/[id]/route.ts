import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { deleteUser } from "app/admin/_actions/userAction";
=======
import { deleteUser } from "../../../../_actions/userAction";

>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    const result = await deleteUser(userId);

    if (result.success) {
      return NextResponse.json(
        { message: result.message || "User deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
