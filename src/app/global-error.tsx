'use client'
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="w-screen h-screen bg-slate-900 p-10 flex flex-col justify-center items-center">
                    <div className='w-full max-w-[360px]'>
                        <h2 className="text-white font-semibold text-2xl">{ error.message } </h2>
                        <Button type='button' onClick={() => reset()} className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-5 rounded-sm transition-all duration-300 ease-in-out uppercase text-lg mt-10`}>
                            Try again
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    )
}