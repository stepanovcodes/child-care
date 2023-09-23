import ProductCard from '@/app/components/ProductCard'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/childcares"> Child Care Facilities</Link>
      <ProductCard/>
    </main>
  )
}
