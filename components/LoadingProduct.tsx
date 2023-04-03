
export default function LoadingProduct() {
    return (
        <div>
            <div className='flex flex-col md:flex-row w-full justify-center animate-pulse'>
                <div className="basis-40 md:basis-2/5 justify-center h-72 overflow-hidden bg-gray-400"></div>
                <div className="md:basis-1/2 flex flex-col ml-0 mt-10 md:mt-0 md:ml-6">
                    <div className="w-[60%] md:w-64 h-4 bg-gray-400"></div>
                    <div className="w-16 h-2 bg-gray-400 mt-4"></div>
                    <div className="w-full h-36 bg-gray-400 mt-4"></div>
                </div>
            </div>
        </div>
    )
}
