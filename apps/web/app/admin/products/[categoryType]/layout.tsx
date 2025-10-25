import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CategoryArray } from "app/lib/consts"
import { Plus } from "lucide-react"

export function generateStaticParams(){
	return CategoryArray.map(item=>item.toLowerCase())
}

export default async function ProductsCategoryLayout({ children, params }: { children: React.ReactNode, params: Promise<{ categoryType: string }> }) {
	const categoryType = (await params).categoryType
	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">Products</h1>
					<p className="text-muted-foreground">
						Manage your product catalog </p>
				</div>
				<Button asChild className="w-fit">
					<Link href="/admin/add-product">
						<Plus className="mr-2 h-4 w-4" />
						Add Product
					</Link>
				</Button>
			</div>

			{/* Category Navigation */}
			<div className="flex items-center space-x-2 overflow-x-auto pb-2">
				{CategoryArray.map((categoryName) => (
					<Button
						asChild
						key={categoryName}
						variant={categoryName.toLowerCase() === categoryType ? "default" : "outline"}
						size="sm"
						className="whitespace-nowrap capitalize transition-colors hover:bg-primary/10"
					>
						<Link prefetch={true} href={`/admin/products/${categoryName.toLowerCase()}`}>
							{categoryName.toLowerCase()}
						</Link>
					</Button>
				))}
			</div>
				<div>
					{children}
				</div>
		</div>
	)
}
