import { NextRequest, NextResponse } from "next/server";
import { deleteBrand } from "../../../../_actions/brandAction";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brandId = parseInt(params.id);
    
    if (isNaN(brandId)) {
      return NextResponse.json(
        { error: "Invalid brand ID" },
        { status: 400 }
      );
    }

    const result = await deleteBrand(brandId);

    if (result.success) {
      return NextResponse.json(
        { message: "Brand deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
