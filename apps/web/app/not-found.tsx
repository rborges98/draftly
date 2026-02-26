import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-draftly-purple)] p-4 text-white">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
        Room not found :(
      </h1>
      <p className="mb-6 text-center text-base sm:text-lg lg:text-xl">
        The room does not exist or it has expired.
      </p>
      <Link href="/">
        <div className="rounded-lg bg-white px-4 py-2 text-center text-sm text-[var(--color-draftly-purple)] shadow-md transition hover:bg-gray-200 sm:px-6 sm:py-3 sm:text-base">
          Go back to the homepage
        </div>
      </Link>
    </div>
  )
}

export default NotFound
