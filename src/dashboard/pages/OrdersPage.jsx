import { useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { useOrders } from "../../context/OrdersContext";
import { formatPrice } from "../../lib/utils";

export default function OrdersPage() {
    const { orders, loading, updateOrderStatus } = useOrders();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.shippingDetails?.email && order.shippingDetails.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === "All" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = async (orderId, currentStatus) => {
        const nextStatus = currentStatus === "Pending" ? "Shipped" : currentStatus === "Shipped" ? "Delivered" : "Pending";
        if (window.confirm(`Change order status to ${nextStatus}?`)) {
            await updateOrderStatus(orderId, nextStatus);
        }
    };

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
                        <Input
                            placeholder="Search orders..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
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
                            {loading ? (
                                <tr><td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">Loading orders...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">No orders found.</td></tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium">{order.orderId}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">{order.shippingDetails?.name || order.customerName || "Guest"}</p>
                                                <p className="text-xs text-muted-foreground">{order.shippingDetails?.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleStatusUpdate(order.id, order.status)}
                                                className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                        order.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                                            "bg-blue-100 text-blue-700"
                                                    }`}
                                                title="Click to change status"
                                            >
                                                {order.status}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{formatPrice(order.amount)}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Eye className="w-4 h-4" />
                                            </Button>
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
