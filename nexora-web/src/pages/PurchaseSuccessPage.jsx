import { ArrowRight, CheckCircle, HandHeart, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState(null);
	const [orderId, setOrderId] = useState(null);

	const { clearCart } = useCartStore();

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const response = await axios.post("/payments/checkout-success", {
					sessionId,
				});

				if (!response.data.success) {
					throw new Error(
						response.data.message || "Payment verification failed"
					);
				}

				setOrderId(response.data.orderId);
				clearCart();
			} catch (error) {
				console.error(
					"Checkout success error:",
					error.response?.data || error.message
				);

				setError(
					error.response?.data?.message ||
						"Something went wrong while confirming your payment."
				);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(
			window.location.search
		).get("session_id");

		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL.");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
				<div className="text-center">
					<div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

					<h2 className="text-xl font-semibold">
						Confirming your payment...
					</h2>

					<p className="text-gray-400 mt-2">
						Please wait while we process your order.
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
				<div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl p-8 text-center">
					<div className="text-red-400 text-5xl mb-4">!</div>

					<h1 className="text-2xl font-bold text-red-400 mb-3">
						Payment Verification Failed
					</h1>

					<p className="text-gray-300 mb-6">{error}</p>

					<Link
						to="/"
						className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-lg transition duration-300"
					>
						Return to Home
						<ArrowRight className="ml-2" size={18} />
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-900">
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				numberOfPieces={700}
				recycle={false}
				style={{ zIndex: 99 }}
			/>

			<div className="relative z-10 max-w-lg w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
				{/* Header */}
				<div className="bg-emerald-600 px-6 py-8 text-center">
					<div className="flex justify-center mb-4">
						<div className="bg-white rounded-full p-3">
							<CheckCircle
								className="text-emerald-600"
								size={58}
							/>
						</div>
					</div>

					<h1 className="text-3xl font-bold text-white">
						Payment Successful!
					</h1>

					<p className="text-emerald-100 mt-2">
						Thank you for shopping with Nexora.
					</p>
				</div>

				{/* Content */}
				<div className="p-6 sm:p-8">
					<div className="text-center mb-6">
						<h2 className="text-xl font-semibold text-white mb-2">
							Your order has been confirmed
						</h2>

						<p className="text-gray-400 text-sm">
							We have successfully received your payment.
							Your order is now being prepared.
						</p>
					</div>

					{/* Order Details */}
					<div className="bg-gray-700 rounded-xl p-5 mb-6">
						<div className="flex items-center gap-3 mb-4">
							<PackageCheck
								className="text-emerald-400"
								size={26}
							/>

							<h3 className="text-lg font-semibold text-white">
								Order Details
							</h3>
						</div>

						<div className="flex items-center justify-between mb-3">
							<span className="text-sm text-gray-400">
								Order ID
							</span>

							<span className="text-sm font-semibold text-emerald-400 break-all ml-4">
								{orderId ? `#${orderId}` : "Confirmed"}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-400">
								Estimated Delivery
							</span>

							<span className="text-sm font-semibold text-emerald-400">
								3-5 business days
							</span>
						</div>
					</div>

					{/* Message */}
					<div className="text-center mb-6">
						<p className="text-gray-300 text-sm">
							You will receive an email with your order
							details and delivery updates.
						</p>
					</div>

					{/* Buttons */}
					<div className="space-y-3">
						<div className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center">
							<HandHeart className="mr-2" size={19} />
							Thank You for Trusting Nexora!
						</div>

						<Link
							to="/"
							className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
						>
							Continue Shopping
							<ArrowRight className="ml-2" size={19} />
						</Link>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t border-gray-700 px-6 py-4 text-center">
					<p className="text-xs text-gray-500">
						Thank you for choosing Nexora.
					</p>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;