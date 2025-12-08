import React from "react";
import { Button } from "./ui/Button";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <h1 className="text-4xl font-heading font-bold text-destructive">Oops!</h1>
                        <p className="text-xl text-muted-foreground">Something went wrong.</p>
                        <div className="bg-destructive/10 p-4 rounded-lg text-left overflow-auto max-h-48">
                            <code className="text-xs text-destructive font-mono">
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            If you are seeing this on a deployed site, check your environment variables.
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
