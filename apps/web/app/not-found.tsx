import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col">
      nao achamos a sala
      <Link href="/"> volta p home</Link>
    </div>
  )
}

export default NotFound
