import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Facebook, Chrome } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { login } = useAuth();
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = "";
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = "Email is required";
            else if (!emailRegex.test(value)) error = "Please enter a valid email address";
        } else if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 8) error = "Password must be at least 8 characters";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation if field has been touched
        if (touched[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched({ email: true, password: true });

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                await login(formData.email, formData.password);
                navigate("/");
            } catch (error) {
                console.error("Login Error:", error);
                setErrors(prev => ({
                    ...prev,
                    root: "Invalid email or password"
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-20">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-md px-4 relative z-10 animate-fade-in-up">
                <Card className="glass-card p-8 md:p-10 border-white/20 dark:border-gray-700/30">
                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-3xl font-heading font-bold">
                            Welcome <span className="gradient-text">Back</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Enter your details to access your account
                        </p>
                        {errors.root && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-lg animate-fade-in mt-4">
                                {errors.root}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-3 h-5 w-5 ${errors.email ? "text-red-500" : "text-muted-foreground"}`} />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`input-field pl-10 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-3 h-5 w-5 ${errors.password ? "text-red-500" : "text-muted-foreground"}`} />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`input-field pl-10 pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full btn-primary h-12 text-lg group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Signing in...</span>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Button variant="outline" className="h-11 hover:bg-accent hover:text-accent-foreground">
                                <Chrome className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button variant="outline" className="h-11 hover:bg-accent hover:text-accent-foreground">
                                <Facebook className="mr-2 h-4 w-4" />
                                Facebook
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
}
