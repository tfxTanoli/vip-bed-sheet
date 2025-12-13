import { useState, useEffect } from "react";
import { Save, Loader2, Store, Phone, Mail, DollarSign, Truck } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { db } from "../../../firebase";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        storeName: "",
        supportEmail: "",
        supportPhone: "",
        currencySymbol: "Rs",
        shippingFee: "0",
        freeShippingThreshold: "0"
    });

    useEffect(() => {
        const settingsRef = db.ref("store_settings");
        settingsRef.once("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSettings(prev => ({ ...prev, ...data }));
            }
            setLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await db.ref("store_settings").set(settings);
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-heading">Settings</h1>
                <p className="text-muted-foreground">Manage your store configuration and preferences</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* General Settings */}
                    <Card className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2 border-b pb-4">
                            <Store className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold">General Information</h2>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Store Name</label>
                            <Input
                                name="storeName"
                                value={settings.storeName}
                                onChange={handleChange}
                                placeholder="My Online Store"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Support Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="supportEmail"
                                    value={settings.supportEmail}
                                    onChange={handleChange}
                                    placeholder="support@example.com"
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Support Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="supportPhone"
                                    value={settings.supportPhone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Commerce Settings */}
                    <Card className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2 border-b pb-4">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold">Commerce</h2>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Currency Symbol</label>
                            <Input
                                name="currencySymbol"
                                value={settings.currencySymbol}
                                onChange={handleChange}
                                placeholder="Rs, $, €"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Standard Shipping Fee</label>
                            <div className="relative">
                                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    name="shippingFee"
                                    value={settings.shippingFee}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="pl-9"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Base shipping charge for all orders</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Free Shipping Threshold</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    name="freeShippingThreshold"
                                    value={settings.freeShippingThreshold}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="pl-9"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Orders above this amount get free shipping</p>
                        </div>
                    </Card>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" size="lg" disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Settings
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
