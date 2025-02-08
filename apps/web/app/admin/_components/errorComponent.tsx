"use client"
function ErrorComponent({error}:{error:string}) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-red-100/10 border border-red-300 text-red-600">
            <h2 className="text-lg font-semibold">🚨 Error: Something Happened</h2>
            <p>{
                error
            }</p>
            <button onClick={
                    () => location.reload()
                }
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                Retry
            </button>
        </div>
    )
}

export default ErrorComponent
