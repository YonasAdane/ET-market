import { Card } from "@/components/ui/card"
import Link from "next/link"

type Props = {}

export default function Footer({}: Props) {
  return (
    <Card className="w-screen">
        <div className="w-4/5 border-b flex justify-between p-6 mx-auto gap-6">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-bold">ET-market</h1>
                </Link>
                <p className="text-muted-foreground">
                    Specializes in providing high-quality,
                    <br/> stylish products
                </p>
            </div>
            <div>
                <h2 className="text-xl font-semibold whitespace-nowrap">Shop</h2>
                <ul className="text-muted-foreground">
                    <li>All collections</li>
                    <li>Winter Edition</li>
                    <li>Discount</li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold ">Company</h2>
                <ul className="text-muted-foreground">
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Affiliates</li>
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold ">Support</h2>
                <ul className="text-muted-foreground">
                    <li>FAQs</li>
                    <li>Cookie Policy</li>
                    <li>Terms of Use</li>
                </ul>
            </div>
        </div>
        <div className="w-full text-center p-4">
            <p className="text-muted-foreground">Copyright &#169;2024 ET-market.All right reserved</p>
        </div>
    </Card>
  )
}