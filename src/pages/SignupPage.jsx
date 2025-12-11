import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Facebook } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { GoogleIcon } from "../components/icons/GoogleIcon";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { signup } = useAuth();
    const navigate = useNavigate();

    const validateField = (name, value, allData = formData) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) error = "Full Name is required";
                else if (value.trim().length < 2) error = "Name must be at least 2 characters";
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) error = "Email is required";
                else if (!emailRegex.test(value)) error = "Please enter a valid email address";
                break;
            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 8) error = "Password must be at least 8 characters";
                else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) error = "Password must contain uppercase, lowercase and number";
                break;
            case "confirmPassword":
                if (!value) error = "Please confirm your password";
                else if (value !== allData.password) error = "Passwords do not match";
                break;
            case "terms":
                if (!value) error = "You must accept the terms and privacy policy";
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        const newFormData = { ...formData, [name]: newValue };

        setFormData(newFormData);

        // Real-time validation if touched
        if (touched[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, newValue, newFormData)
            }));

            // Re-validate confirmPassword if password changes
            if (name === "password" && touched.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: validateField("confirmPassword", formData.confirmPassword, newFormData)
                }));
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, val)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            terms: true
        });

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                await signup(formData.email, formData.password, formData.name);
                navigate("/");
            } catch (error) {
                console.error("Signup Error:", error);
                let message = "Failed to create account.";
                if (error.code === 'auth/email-already-in-use') {
                    message = "Email is already registered.";
                    setErrors(prev => ({ ...prev, email: message }));
                } else if (error.code === 'auth/weak-password') {
                    message = "Password should be at least 6 characters.";
                    setErrors(prev => ({ ...prev, password: message }));
                } else {
                    setErrors(prev => ({ ...prev, root: message }));
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-20">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-md px-4 relative z-10 animate-fade-in-up">
                <Card className="glass-card p-8 md:p-10 border-white/20 dark:border-gray-700/30">
                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-3xl font-heading font-bold">
                            Create <span className="gradient-text">Account</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Join VIP Bed Sheets for exclusive offers and updates
                        </p>
                        {errors.root && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-lg animate-fade-in">
                                {errors.root}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className={`absolute left-3 top-3 h-5 w-5 ${errors.name ? "text-red-500" : "text-muted-foreground"}`} />
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className={`input-field pl-10 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.name}</p>}
                        </div>

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
                            {errors.email && <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.email}</p>}
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
                                    placeholder="Create a password"
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
                            {errors.password && <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-3 h-5 w-5 ${errors.confirmPassword ? "text-red-500" : "text-muted-foreground"}`} />
                                <input
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className={`input-field pl-10 pr-10 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.confirmPassword}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-2 pt-2">
                                <input
                                    name="terms"
                                    type="checkbox"
                                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />
                                <span className={`text-sm ${errors.terms ? "text-red-500" : "text-muted-foreground"}`}>
                                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                </span>
                            </div>
                            {errors.terms && <p className="text-xs text-red-500 font-medium animate-fade-in">{errors.terms}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full btn-primary h-12 text-lg group mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Creating account...</span>
                            ) : (
                                <>
                                    Create Account
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
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Button variant="outline" className="h-11 hover:bg-accent hover:text-accent-foreground">
                                <GoogleIcon className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button variant="outline" className="h-11 hover:bg-accent hover:text-accent-foreground">
                                <Facebook className="mr-2 h-4 w-4" />
                                Facebook
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
}
