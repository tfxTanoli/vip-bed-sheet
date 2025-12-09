import { useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";

export default function ReviewSection({ reviews, isEligible, hasReviewed, onSubmit, isSubmitting }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit({ rating, comment });
            setComment("");
            setRating(5);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-heading font-bold">
                    Customer Reviews
                </h2>
                <div className="text-muted-foreground">
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                </div>
            </div>

            {/* Write a Review Section */}
            {isEligible && !hasReviewed ? (
                <Card className="p-6 bg-secondary/20 border-none">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-muted-foreground/30"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts about this product..."
                                className="w-full min-h-[100px] p-3 rounded-lg border bg-background resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                required
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </form>
                </Card>
            ) : hasReviewed ? (
                <div className="p-4 rounded-lg bg-green-500/10 text-center text-green-600 border border-green-500/20 text-sm">
                    You have already reviewed this product. Thank you for your feedback!
                </div>
            ) : (
                <div className="p-4 rounded-lg bg-secondary/30 text-center text-muted-foreground text-sm">
                    Only customers who have purchased and received this product can write a review.
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <div className="text-center py-10 bg-muted/20 rounded-xl">
                        <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0 animate-fade-in">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{review.userName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(review.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-muted-foreground/30"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mt-3 pl-14">
                                {review.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
