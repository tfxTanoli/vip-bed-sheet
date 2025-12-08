import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { User, Lock, Save, AlertCircle, CheckCircle } from "lucide-react";

export default function ProfilePage() {
    const { user, updateUserProfile, updateUserPassword, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else if (user?.displayName) {
            setName(user.displayName);
        }
    }, [isAuthenticated, user, navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await updateUserProfile({ displayName: name });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile." });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: "error", text: "Password must be at least 6 characters" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await updateUserPassword(passwordData.newPassword);
            setMessage({ type: "success", text: "Password updated successfully!" });
            setPasswordData({ newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Failed to update password. Re-login heavily recommended." });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-heading font-bold">
                        My <span className="gradient-text">Profile</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Profile Information Card */}
                    <Card className="p-6 md:p-8 space-y-6">
                        <div className="flex items-center space-x-4 border-b border-border pb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Personal Information</h2>
                                <p className="text-sm text-muted-foreground">Update your personal details</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input
                                    value={user.email}
                                    disabled
                                    className="bg-muted opacity-70"
                                />
                                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading || name === user.displayName}>
                                {loading ? "Saving..." : "Save Changes"}
                                <Save className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </Card>

                    {/* Security Card */}
                    <Card className="p-6 md:p-8 space-y-6">
                        <div className="flex items-center space-x-4 border-b border-border pb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Security</h2>
                                <p className="text-sm text-muted-foreground">Change your password</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">New Password</label>
                                <Input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm New Password</label>
                                <Input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                            <Button type="submit" variant="outline" className="w-full hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/50" disabled={loading || !passwordData.newPassword}>
                                Update Password
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
