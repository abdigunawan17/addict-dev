import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full rounded-lg bg-slate-800">
        <div className='text-center my-4'><h2>Addct App</h2></div>
        <div><Link className='bg-slate-900 my-4 p-3 rounded-lg block' href='/signin'>Sign in</Link></div>
        <div><Link className='bg-slate-900 my-4 p-3 rounded-lg block' href='/signup'>Sign up</Link></div>
      </div>
      
    </main>
  )
}
