
export default function LoadingIndex() {
    return (
        <div>
            <div className="text-3xl w-72 h-9 bg-gray-400 animate-pulse"></div>
            <div className='flex flex-wrap w-full mt-5'>
                <div className="flex flex-col items-start p-2 basis-1/2 mb-10 animate-pulse">
                    <div className="w-20 h-6 bg-gray-400"></div>
                    <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1"></div>
                </div>
                <div className="flex flex-col items-start p-2 basis-1/2 mb-10 animate-pulse">
                    <div className="w-20 h-6 bg-gray-400"></div>
                    <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1"></div>
                </div>
                <div className="flex flex-col items-start p-2 basis-1/2 mb-10 animate-pulse">
                    <div className="w-20 h-6 bg-gray-400"></div>
                    <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1"></div>
                </div>
                <div className="flex flex-col items-start p-2 basis-1/2 mb-10 animate-pulse">
                    <div className="w-20 h-6 bg-gray-400"></div>
                    <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1"></div>
                </div>
            </div>
        </div>
    )
}
