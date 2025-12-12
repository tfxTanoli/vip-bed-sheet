import { Search, Filter, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Orders</h1>
                <p className="text-muted-foreground">Manage and track customer orders</p>
            </div>

            <Card className="p-6">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search orders by ID or customer..." className="pl-9" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Status
                        </Button>
                        <Button variant="outline">Export</Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Order</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">#ORD-{2000 + i}</td>
                                    <td className="px-4 py-3 text-muted-foreground">Dec 12, 2024</td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">Customer {i}</p>
                                            <p className="text-xs text-muted-foreground">customer{i}@email.com</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${i % 3 === 0 ? "bg-green-100 text-green-700" :
                                            i % 3 === 1 ? "bg-yellow-100 text-yellow-700" :
                                                "bg-blue-100 text-blue-700"
                                            }`}>
                                            {i % 3 === 0 ? "Delivered" : i % 3 === 1 ? "Pending" : "Shipped"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium">Rs {1500 * i}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
