'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SuccessPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const sessionId = searchParams.get('session_id')

	return (
		<div className="flex items-center justify-center px-4 min-h-[calc(100vh-108px)]">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
				<h1 className="text-2xl font-bold text-green-600">
					🎉 Payment successful
				</h1>

				<p className="mt-3 text-sm text-gray-500">
					Your payment was completed successfully.
				</p>

				{sessionId && (
					<p className="mt-2 text-xs text-gray-400 break-all">
						Session: {sessionId}
					</p>
				)}

				<button
					onClick={() => router.push('/')}
					className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white font-medium transition hover:bg-gray-800 active:scale-[0.98]"
				>
					Go to home
				</button>
			</div>
		</div>
	)
}
