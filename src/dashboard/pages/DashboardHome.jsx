import { DollarSign, ShoppingBag, Users, TrendingUp, Package, Eye } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { useOrders } from "../../context/OrdersContext";
import { formatPrice } from "../../lib/utils";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function DashboardHome() {
    const { orders, loading } = useOrders();

    // Calculate Stats
    const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
    const totalOrders = orders.length;

    // Simplistic active customers (unique emails)
    const uniqueCustomers = new Set(orders.map(o => o.shippingDetails?.email).filter(Boolean)).size;

    const productsSold = orders.reduce((sum, order) => {
        return sum + (order.items?.reduce((is, item) => is + item.quantity, 0) || 0);
    }, 0);

    const stats = [
        { label: "Total Revenue", value: formatPrice(totalRevenue), change: "+0%", icon: DollarSign, color: "text-green-600 bg-green-100" },
        { label: "Total Orders", value: totalOrders.toString(), change: "+0%", icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
        { label: "Active Customers", value: uniqueCustomers.toString(), change: "+0%", icon: Users, color: "text-purple-600 bg-purple-100" },
        { label: "Products Sold", value: productsSold.toString(), change: "+0%", icon: Package, color: "text-orange-600 bg-orange-100" },
    ];

    const recentOrders = orders.slice(0, 5);

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

            {/* Recent Orders Overview */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold font-heading">Recent Orders</h2>
                    <Link to="/dashboard/orders" className="text-sm text-primary hover:underline">View All</Link>
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
                            {loading ? (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">Loading recent orders...</td></tr>
                            ) : recentOrders.length === 0 ? (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">No orders yet.</td></tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium">{order.orderId}</td>
                                        <td className="px-4 py-3">{order.shippingDetails?.name || order.customerName || "Guest"}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                    order.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-blue-100 text-blue-700"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{formatPrice(order.amount)}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
