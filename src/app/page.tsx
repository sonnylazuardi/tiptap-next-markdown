import Tiptap from '@/components/Tiptap'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <article className='w-full prose lg:prose-xl text-white prose-headings:text-white prose-blockquote:text-white prose-a:text-white'>
        <Tiptap />
      </article>
    </main>
  )
}
