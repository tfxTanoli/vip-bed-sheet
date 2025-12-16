import { X, Package, MapPin, Phone, Mail, User, Calendar, CreditCard } from "lucide-react";
import { formatPrice } from "../../lib/utils";
import { Button } from "../../components/ui/Button";

export default function OrderDetailsModal({ order, onClose }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-heading font-bold">Order Details</h2>
                        <p className="text-sm text-muted-foreground">
                            Order #{order.orderId} • {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Status & Payment */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-green-500" :
                                        order.status === "Shipped" ? "bg-blue-500" :
                                            "bg-yellow-500"
                                    }`} />
                                <span className="font-medium">{order.status}</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Payment Method</span>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{order.paymentMethod || "Cash on Delivery"}</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Amount</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-primary">{formatPrice(order.amount)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Customer Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b">
                                <User className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">Customer Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <User className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="font-medium">{order.shippingDetails?.name || order.customerName || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">Customer</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="font-medium">{order.shippingDetails?.email || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">Email Address</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="font-medium">{order.shippingDetails?.phone || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">Phone Number</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b">
                                <MapPin className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">Shipping Address</h3>
                            </div>
                            {order.shippingDetails ? (
                                <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                                    <p className="font-medium text-lg mb-1">{order.shippingDetails.name}</p>
                                    <div className="space-y-1 text-muted-foreground">
                                        <p>{order.shippingDetails.address}</p>
                                        <p>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zipCode}</p>
                                        <p className="font-medium text-foreground mt-2">{order.shippingDetails.country}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">No shipping details available.</p>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <Package className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Order Items</h3>
                        </div>
                        <div className="bg-secondary/20 rounded-lg overflow-hidden border border-border">
                            <table className="w-full text-sm">
                                <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3 text-center">Qty</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {order.items && order.items.map((item, index) => (
                                        <tr key={index} className="hover:bg-secondary/30">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded bg-background overflow-hidden border border-border flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">{item.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center font-medium">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right">{formatPrice(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-secondary/20 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
}
