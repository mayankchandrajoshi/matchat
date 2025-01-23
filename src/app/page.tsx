import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="w-screen h-screen bg-slate-900 p-10 flex flex-col justify-center items-center">
        <div className='w-full max-w-[360px]'>
          <h1 className={`w-min mx-auto font-extrabold text-8xl p-6 px-8 bg-green-500 text-slate-900 rounded-full`}>M</h1>
          <Link href="/chats" className={`inline-block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-sm transition-all duration-300 ease-in-out uppercase text-lg mt-10 text-center`}>
            Start Chatting
          </Link>
        </div>
    </div>
  );
}