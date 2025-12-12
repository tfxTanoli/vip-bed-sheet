import { DollarSign, ShoppingBag, Users, TrendingUp, Package } from "lucide-react";
import { Card } from "../../components/ui/Card";

const stats = [
    { label: "Total Revenue", value: "Rs 1,24,500", change: "+12.5%", icon: DollarSign, color: "text-green-600 bg-green-100" },
    { label: "Total Orders", value: "156", change: "+8.2%", icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
    { label: "Active Customers", value: "89", change: "+2.4%", icon: Users, color: "text-purple-600 bg-purple-100" },
    { label: "Products Sold", value: "432", change: "+5.1%", icon: Package, color: "text-orange-600 bg-orange-100" },
];

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <span className="text-sm text-green-600 font-medium flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stat.change}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Orders Overview (Mock) */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold font-heading">Recent Orders</h2>
                    <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3 rounded-r-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">#ORD-2024-{1000 + i}</td>
                                    <td className="px-4 py-3">John Doe</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${i === 1 ? "bg-yellow-100 text-yellow-700" :
                                            i === 2 ? "bg-green-100 text-green-700" :
                                                "bg-blue-100 text-blue-700"
                                            }`}>
                                            {i === 1 ? "Pending" : i === 2 ? "Delivered" : "Shipped"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">Rs {2500 * i}</td>
                                    <td className="px-4 py-3 text-muted-foreground">Dec {10 - i}, 2024</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
