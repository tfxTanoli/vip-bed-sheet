import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../firebase";

const OrdersContext = createContext();

export function useOrders() {
    return useContext(OrdersContext);
}

export function OrdersProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ordersRef = db.ref("all_orders");

        const handleData = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedOrders = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                // Sort by newest first
                loadedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(loadedOrders);
            } else {
                setOrders([]);
            }
            setLoading(false);
        };

        ordersRef.on("value", handleData);

        return () => ordersRef.off("value", handleData);
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // we need to update status in both all_orders and specific user orders
            // checking if we have userId in the order object, which we should have from now on
            const orderToUpdate = orders.find(o => o.orderId === orderId || o.id === orderId);

            if (!orderToUpdate) return;

            const updates = {};
            // Update in all_orders
            updates[`/all_orders/${orderToUpdate.id || orderId}/status`] = newStatus;

            // Update in user's order list if userId exists
            if (orderToUpdate.userId) {
                updates[`/orders/${orderToUpdate.userId}/${orderToUpdate.id || orderId}/status`] = newStatus;
            }

            await db.ref().update(updates);
            return true;
        } catch (error) {
            console.error("Error updating order status:", error);
            return false;
        }
    };

    const value = {
        orders,
        loading,
        updateOrderStatus
    };

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    );
}
